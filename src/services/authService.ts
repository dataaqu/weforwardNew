import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export class AuthService {
  // Admin login
  async loginAdmin(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(`Logout failed: ${error.message}`);
    }
  }

  // Check if user is admin (customize this logic based on your needs)
  isAdmin(user: User | null): boolean {
    if (!user) return false;
    
    // Add your admin email addresses here
    const adminEmails = [
      'admin@weforward.ge', 
      'datiobashvili1@gmail.com'
    ];
    
    return adminEmails.includes(user.email || '');
  }

  // Auth state listener
  onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  }
}

export const authService = new AuthService();
