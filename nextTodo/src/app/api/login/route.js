import path from 'path';
import fs from 'fs';
import { getJWTtoken } from '@/lib/jwt';

export async function POST(req) {
  try {
    const reqBody = await req.json();
	const {email,password} = reqBody;
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
if (fs.existsSync(filepath2)) {
  console.log('File exists');
	const data = fs.readFileSync(filepath2, 'utf-8')
console.log(data)
console.log(req.body)
} else {
  console.log('File does not exist');
}
    console.error(error+ "    "+process.cwd());
    return new Response(JSON.stringify(null));
  }
}
