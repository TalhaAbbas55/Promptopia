'use client'
import React,{useState, useEffect} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
const MyProfile = () => {
    const [posts, setPosts] = useState([])
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();
            console.log(data);
            setPosts(data);
        }

        session?.user.id && !posts.length &&  fetchPosts();
    }, [session]);
    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
      
    }
    const handleDelete = (post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
      if(!hasConfirmed) return;
      try {
        
   
      fetch(`/api/prompt/${post._id}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((data) => {
        
        setPosts(posts.filter((singlePost) => singlePost._id !== post._id));
      })
      .catch((err) => console.log(err));
         } catch (error) {
        console.log(error,'err')
      }
    }
  return (
    <Profile
        name={session?.user.name}
        desc={"Welcome to your personalized profile page"}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;