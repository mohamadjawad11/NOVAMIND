import sql from "../configs/db.js";


export const getUserCreateions=async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations=await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({success:true, creations});

  }catch(error){
    console.error("Error in getUserCreateions:",error.message);
    res.json({success:false,message:error.message});
  }
}


export const getPublishedCreations=async(req, res) => {
    try {
        const creations=await sql`SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;
        res.json({success:true,creations});
      }catch(error){
        console.error("Error in publishedCreations:",error.message);
        res.json({success:false,message:error.message});
      }
}


export const toogleLikeCreation=async(req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;
    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return res.json({ success: false, message: "Creation not found." });
    }

    const currentLikes= creation.likes;
    const userIdStr=userId.toString();
    let updatedLikes;
    let message;
    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "You have removed your like.";
    }else{
        updatedLikes = [...currentLikes, userIdStr];
        message = "You have added your like.";
    }
    const formattedArray=`{${updatedLikes.join(',')}}`;
    await sql `UPDATE creations SET likes=${formattedArray}::text[] WHERE id=${id}`;
    res.json({ success: true, message });
    
  } catch (error) {
    console.error("Error in toogleLikeCreation:", error.message);
    res.json({ success: false, message: error.message });
  }
};