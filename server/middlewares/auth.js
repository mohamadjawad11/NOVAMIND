// // Import the Clerk client to interact with Clerk users and metadata
// import { clerkClient } from "@clerk/express";

// // Define a custom middleware function for authentication and plan checking
// export const auth = async (req, res, next) => {
//     const authInfo = await req.auth();


//     try {
//         // Extract userId and the 'has' function (used for checking subscriptions) from the request's auth context
//         const { userId, has } = await req.auth();

//         // Check if the user has a premium plan
//         const hasPremiumPlan = await has({ plan: 'premium' });

//         // Fetch the full user object from Clerk using the userId
//         const user = await clerkClient.users.getUser(userId);

//         // If the user does NOT have a premium plan but has 'free_usage' data stored
//         if (!hasPremiumPlan && user.privateMetadata.free_usage) {
//             // Set the free usage value from Clerk's private metadata on the request
//             req.free_usage = user.privateMetadata.free_usage;
//         } else {
//             // If the user is premium or doesn't have 'free_usage' metadata, set free usage to 0 in Clerk
//             await clerkClient.users.updateUserMetadata(userId, {
//                 privateMetadata: { free_usage: 0 }
//             });

//             // Also set it to 0 on the request object
//             req.free_usage = 0;
//         } 

//         // Set a 'plan' property on the request to identify whether the user is premium or free
//         req.plan = hasPremiumPlan ? 'premium' : 'free';
       

//         // Continue to the next middleware or route handler
//         next();

//     } catch (error) {
//         // If an error occurs, respond with an empty object (you may want to improve error handling here)
//         res.json({success: false, message: "Authentication failed."});
//     }
// }

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const authInfo = await req.auth();


    const { userId, has } = authInfo;

    // Check if authenticated
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid or missing token." });
    }

    // Check if plan checker is available
    if (!has) {
      return res.status(401).json({ success: false, message: "Unauthorized: Missing plan checker." });
    }

    // Fetch user from Clerk
    const user = await clerkClient.users.getUser(userId);

    // Check if user has premium plan
    const hasPremiumPlan = await has({ plan: 'premium' });

    let freeUsage = 0;


    if (!hasPremiumPlan) {
      if (typeof user.privateMetadata?.free_usage === 'undefined') {
        // If free_usage is not set, initialize it to 0
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: { free_usage: 0 }
        });
        freeUsage = 0;
      } else {
        // Use existing value
        freeUsage = user.privateMetadata.free_usage;
      }
    }

    // Attach data to request
    req.userId = userId;
    req.plan = hasPremiumPlan ? 'premium' : 'free';
    req.free_usage = freeUsage;

    next();
  } catch (error) {
    console.error("❌ Clerk AUTH ERROR:", error);
    return res.status(401).json({ success: false, message: "Authentication failed." });
  }
};
