'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const plans = [
    {
        tier: 'tier1',
        name: 'Do it Yourself',
        price: 2700,
        features: [
            'Get the eBook',
            'Do the assignments and writing yourself',
        ],
    },
    {
        tier: 'tier2',
        name: 'Do it With Me',
        price: 4800,
        features: [
            'Get the eBook',
            'Have me review your assignments',
            'Two 1-1 masterclasses',
        ],
    }
];

export default function Subscription() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loadingTier, setLoadingTier] = useState(null);
    const [error, setError] = useState('');
    const [notification, setNotification] = useState(''); // New state for notification

    if (status === 'loading') {
        return <div className="text-center py-12 text-lg font-medium text-gray-700">Loading...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    const handleSubscribe = async (tier) => {
        setLoadingTier(tier);
        setError('');
        setNotification(''); // Clear previous notification

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tier }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSelectedPlan(tier);
            setNotification('Subscription request submitted! Please wait for admin approval.');
            setTimeout(() => setNotification(''), 120000); // 1 minute = 60000 ms
            router.push('/ebook');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingTier(null);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Hey, friend…here's what the eBook will cost you
                    </p>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose the plan that you think will help you most
                    </p>

                </div>

                {error && (
                    <div className="mx-auto max-w-4xl mt-8">
                        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    </div>
                )}

                {notification && (
                    <div className="mx-auto max-w-4xl mt-8">
                        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {notification}
                        </div>
                    </div>
                )}

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.tier}
                            className="relative flex flex-col justify-between rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-200 p-8 ring-1 ring-gray-200 xl:p-10"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                                <p className="mt-4 text-4xl font-bold text-indigo-600">
                                    {plan.price} PKR
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(plan.tier)}
                                disabled={loadingTier === plan.tier || selectedPlan === plan.tier}
                                className={`w-full rounded-lg px-4 py-3 text-center font-semibold transition duration-200 ${selectedPlan === plan.tier
                                    ? 'bg-green-500 text-white cursor-not-allowed'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-500'
                                    }`}
                            >
                                {selectedPlan === plan.tier
                                    ? 'Subscription Pending'
                                    : loadingTier === plan.tier
                                        ? 'Processing...'
                                        : 'Subscribe'}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mx-auto max-w-4xl text-center my-12">

                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Payment Information
                    </p>

                    <h2 className='text-2xl font-bold tracking=tight text-red-500 sm:text-5xl py-2'>Jazcash:</h2>
                    <p className='text-2xl font-light py-2'>Account Nmb: 03176824639 <br />
                        Account Name: Muhammad Shafique
                    </p>
                    <p className='font-light'>

                        Send the <span className='font-bold'>screenshot</span> on WhatsApp (03176824639).
                        Also, message me on WA if you have any questions.

                    </p>

                </div>

            </div>
        </div>
    );
}
