// app/subscription/page.js
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (status === 'loading') {
        return <div className="text-center py-12 text-lg font-medium text-gray-700">Loading...</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/login');
        return null;
    }

    const handleSubscribe = async (tier) => {
        setLoading(true);
        setError('');

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
            alert('Subscription request submitted! Please wait for admin approval.');
            router.push('/ebook');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose your subscription plan
                    </p>
                    <p className="mt-4 text-lg text-gray-500">
                        Select a plan that suits your needs and start your journey today.
                    </p>
                </div>

                {error && (
                    <div className="mx-auto max-w-4xl mt-8">
                        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
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
                                disabled={loading || selectedPlan === plan.tier}
                                className={`w-full rounded-lg px-4 py-3 text-center font-semibold transition duration-200 ${selectedPlan === plan.tier
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-500'
                                    }`}
                            >
                                {selectedPlan === plan.tier
                                    ? 'Subscription Pending'
                                    : loading
                                        ? 'Processing...'
                                        : 'Subscribe'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
