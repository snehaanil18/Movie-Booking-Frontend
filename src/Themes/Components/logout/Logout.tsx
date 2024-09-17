import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './logout.module.css'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'

const Logout = () => {
  const router = useRouter();
  const [show,setShow] = useState(false);
  const { data: session } = useSession();
useEffect(() => {
  if(session){
    setShow(!show)
  }
},[session])

  const handleLogout = async () => {
    try {
      // Clear any tokens stored in session storage
      sessionStorage.removeItem('token');

      // Sign out using NextAuth.js
      await signOut({ redirect: false });

      // Redirect the user after signing out
      router.push('/Login'); // Redirect to the login page or home page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className={styles.container}>
      {show?
      <button onClick={handleLogout}>Logout</button>:""
    }
      
    </div>

  );
};

export default Logout;
