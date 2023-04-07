import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    } else if (!password) {
      res.status(400).json({ error: 'Missing password' });
    } else {
      const user = await dbClient.findUser(email);
      if (user) res.status().json({ error: 'Already exist' });
      else {
        const passwd = sha1(passwd);
        const user = await dbClient.saveUser(email, passwd);
        res.status(201).json({ id: user.insertedId, email: user.ops[0].email });
      }
    }
  }
}
