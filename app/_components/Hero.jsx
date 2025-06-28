'use client'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'

function Hero() {

        const {user} = useUser();

return (
        <section className="relative mt-5 bg-white flex flex-col items-center">
                        {/* Grid background */}
                        <div
                                className={cn(
                                        "absolute inset-0",
                                        "[background-size:40px_40px]",
                                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                                )} />
            {/* Radial gradient overlay */}
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            
            <div className="relative z-20 mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                    <div className="mx-auto max-w-prose text-center">
                    <h1 className="text-6xl font-bold text-gray-900 sm:text-5xl">
                            Manage your expense
                            <strong className="text-indigo-600"> control your money </strong>
                            conversions
                    </h1>

                    <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                            Start creating your budget and save ton of money
                    </p>

                    <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                            <a
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                            href="/sign-in"
                            >
                            {user? 'Go to Dashboard' : 'Get Started'}
                            </a>

                    </div>
                    </div>
            </div>
            <Image src={'/dashboard.png'} alt='dashboard' width={1000} height={700} 
                    className='relative z-20 mt-7 mb-5 border-5 rounded-xl'
            />
        <footer className="relative z-20 w-full bg-gray-50 border-t border-gray-200 mt-16">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center space-y-4">
                                <div className="flex items-center space-x-2">
                                        <span className="text-xl font-bold text-gray-900">ExpenseTracker</span>
                                </div>
                                <p className="text-sm text-gray-600 text-center">
                                        © 2025 ExpenseTracker. All rights reserved.
                                </p>
                                <div className="flex space-x-6">
                                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
                                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
                                        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
                                </div>
                        </div>
                </div>
        </footer>
    </section>
)
}

export default Hero