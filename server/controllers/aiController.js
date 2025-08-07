import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Replicate from "replicate";
import axios from "axios";
import { writeFile } from "fs/promises";
import { Buffer } from "buffer";
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import path from "path";
import { pipeline } from 'stream/promises';
import { PassThrough } from 'stream'; 


const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});


export const generateArticle = async (req, res) => {
  console.log("generate-article route executed");

  try {
    
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    
    const plan = req.plan ;
    const free_usage = req.free_usage;

   

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium for unlimited access."
      });
    }

    
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{
         role: "user",
          content: prompt,
         },
        ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content


   
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

  
    if (plan !== 'premium') {
  const updatedUsage = (free_usage || 0) + 1;

  console.log("free_usage before increment:", free_usage);
  console.log("free_usage after increment:", updatedUsage);

  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      free_usage: updatedUsage
    }
  });
}


   
    res.json({ success: true, content });

  } catch (error) {
    console.error(" Error in generateArticle:", error.message);
    res.json({ success: false, message: "Failed to generate article."});
  }
};

export const generateBlogTitle = async (req, res) => {

  try {
    
    const { userId } = req.auth();
    const { prompt } = req.body;

    
    const plan = req.plan ;
    const free_usage = req.free_usage;

   

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium for unlimited access."
      });
    }

    
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{
         role: "user",
          content: prompt,
         },
        ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content


   
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

  
  if(plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: (free_usage || 0) + 1
      }
    });
  }

  console.log("free_usage before increment:", free_usage);
  console.log("free_usage after increment:", updatedUsage);
   
    res.json({ success: true, content });

  } catch (error) {
    console.error(" Error in generateArticle:", error.message);
    res.json({ success: false, message:error.message || "Failed to generate blog title."});
  }
};



export const generateImage = async (req, res) => {
  try {
    const userId = req.userId;
    const { prompt, publish } = req.body;

    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium for unlimited access.",
      });
    }

    const input = {
      prompt: prompt,
      scheduler: "K_EULER",
    };

    // Run Replicate model
    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      { input }
    );

    console.log("Replicate output:", output);

    

    const stream = output[0];

const uploadFromStream = () =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    pipeline(stream, uploadStream).catch(reject);
  });


    const uploadResult = await uploadFromStream();

    const secure_url = uploadResult.secure_url;

    // Save creation in DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    // Update usage if not premium
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: (free_usage || 0) + 1,
        },
      });
    }

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Error in generateImage:", error);
    res.json({
      success: false,
      message: error.message || "Failed to generate image.",
    });
  }
};
export const removeImageBackground = async (req, res) => {

  try {
    
    const { userId } = req.auth();
   const {image}=req.file;

    
    const plan = req.plan ;
    const free_usage = req.free_usage;

   

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium for unlimited access."
      });
    }
  

    const {secure_url}= await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: 'background_removal',
          background_removal: 'remove_the_background'
        },
      ],
      
      });


   
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove Background from image', ${secure_url}, 'image') `;

  
  if(plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: (free_usage || 0) + 1
      }
    });
  }

  console.log("free_usage before increment:", free_usage);
console.log("free_usage after increment:", (free_usage || 0) + 1);

   
    res.json({ success: true, content:secure_url });

  } catch (error) {
    console.error(" Error in generateArticle:", error.message);
    res.json({ success: false, message:error.message || "Failed to generate blog title."});
  }
};


export const removeImageObject = async (req, res) => {

  try {
    
    const { userId } = req.auth();
    const {object}=req.body
   const {image}=req.file;

    
    const plan = req.plan ;
    const free_usage = req.free_usage;

   

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium for unlimited access."
      });
    }
  

    const {public_id}= await cloudinary.uploader.upload(image.path)

    const imageUrl= cloudinary.url(public_id, {
      transformation: [
        {
          effect:`gen_remove:${object}`
        }
      ],
      resource_type: 'image',
      });

   
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image') `;

  
  if(plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: (free_usage || 0) + 1
      }
    });
  }

  console.log("free_usage before increment:", free_usage);
console.log("free_usage after increment:", (free_usage || 0) + 1);

   
    res.json({ success: true, content:imageUrl });

  } catch (error) {
    console.error(" Error in generateArticle:", error.message);
    res.json({ success: false, message:error.message || "Failed to generate blog title."});
  }
};


export const resumeReview = async (req, res) => {

  try {
    
    const { userId } = req.auth();
    const resume=req.file
  

    
    const plan = req.plan ;
    const free_usage = req.free_usage;

   

    if (plan !== 'premium' && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Free usage limit reached. Upgrade to premium for unlimited access."
      });
    }
  

    if(resume.size>5*1024*1024){
      res.json({success:false,message:"File size should be less than 5MB"});
    }

    const dataBuffer=fs.readFileSync(resume.path);

    const pdfData=await pdf(dataBuffer);

    const prompt=`Review the following resume and provide constructive feedback on its strength ,weakness,and areas improvment
    .Resume Content:\n\n${pdfData.text}`;

     const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{
         role: "user",
          content: prompt,
         },
        ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content
   
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review') `;

  
  if(plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: (free_usage || 0) + 1
      }
    });
  }

  console.log("free_usage before increment:", free_usage);
console.log("free_usage after increment:", (free_usage || 0) + 1);

   
    res.json({ success: true, content:content });

  } catch (error) {
    console.error(" Error in generateArticle:", error.message);
    res.json({ success: false, message:error.message || "Failed to generate blog title."});
  }
};