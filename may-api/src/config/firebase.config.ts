import admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Debug: Check xem env variables được load hay không
  console.log('🔍 DEBUG Firebase Config:');
  console.log('FIREBASE_PROJECT_ID:', projectId);
  console.log('FIREBASE_CLIENT_EMAIL:', clientEmail);
  console.log('FIREBASE_PRIVATE_KEY (first 50 chars):', privateKey?.slice(0, 50));
  console.log('FIREBASE_PRIVATE_KEY length:', privateKey?.length);

  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Missing env variables detected!');
    throw new Error('Missing Firebase environment variables');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, '\n'),
    } as any),
  });
}

export default admin;