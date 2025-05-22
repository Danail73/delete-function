import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const users = new Users(client);

    // Assume userId is passed in request payload
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const userId = body?.userId;
    if (!userId) throw new Error('Missing userId in payload');

    console.log('req.body type:', typeof req.body);
    console.log('req.body content:', req.body);
    console.log('key:', process.env.APPWRITE_API_KEY)

    await users.delete(userId);

    return res.json({ success: true, message: 'Account deleted successfully.' });

  } catch (err) {
    error('Failed to delete account: ' + err.message);
    return res.json({ success: false, message: err.message });
  };
};
