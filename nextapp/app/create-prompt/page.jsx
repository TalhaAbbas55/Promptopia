'use client';
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import From from '@components/Form';
const page = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e) => {
        console.log(post,'post here')
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/prompt/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt:post.prompt, userId: session?.user.id, tag: post.tag}),
            });

            if(res.ok){
                router.push("/") // redirect to home page

            }
          
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
  return (
    <From
    type = "Create"
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit = {createPrompt}
    />
  )
}

export default page;