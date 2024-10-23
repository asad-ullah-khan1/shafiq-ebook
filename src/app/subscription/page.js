// app/subscription/page.js
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const plans = [
    {
        tier: 'tier1',
        name: 'Basic Plan',
        price: 9.99,
        features: [
            'Access to basic ebook collection',
            'Monthly new releases',
            'Basic reading features',
            'Mobile access'
        ],
    },
    {
        tier: 'tier2',
        name: 'Premium Plan',
        price: 19.99,
        features: [
            'Access to entire ebook collection',
            'Early access to new releases',
            'Advanced reading features',
            'Mobile and tablet access',
            'Offline downloads',
            'Priority support'
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
        return <div className="text-center py-12">Loading...</div>;
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
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose your subscription plan
                    </p>
                </div>

                {error && (
                    <div className="mx-auto max-w-4xl mt-8">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </div>
                    </div>
                )}

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.tier}
                            className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-x-4">
                                    <h3 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h3>
                                </div>
                                <p className="mt-4 text-sm leading-6 text-gray-600">
                                    {plan.features.join(' • ')}
                                </p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                                </p>
                            </div>
                            <button
                                onClick={() => handleSubscribe(plan.tier)}
                                disabled={loading || selectedPlan === plan.tier}
                                className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${selectedPlan === plan.tier
                                    ? 'bg-green-600 text-white'
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