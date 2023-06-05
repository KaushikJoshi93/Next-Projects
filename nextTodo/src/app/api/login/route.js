import path from 'path';
import fs from 'fs';
import { getJWTtoken } from '@/lib/jwt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
	console.log(process.cwd()+"");
    const filepath = path.join(process.cwd(), 'src','json', 'users.json');
    const userData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

    // Find the user credentials in the JSON data
    const user = userData.find((item, index) => {
      if (item.email === email && item.password === password) {
        return true;
      }
    });

    if (user) {
      // Get token here
      const token = getJWTtoken(user);
      return new Response(JSON.stringify({ ...user, token }));
    } else {
      return new Response(JSON.stringify(null));
    }
  } catch (error) {
    // Handle any errors
const filepath2 = path.join(process.cwd(), 'src','json', 'users.json');
if (fs.existsSync(filePath2)) {
  console.log('File exists');
} else {
  console.log('File does not exist');
}
    console.error(error+ "    "+process.cwd());
    return new Response(JSON.stringify(null));
  }
}
