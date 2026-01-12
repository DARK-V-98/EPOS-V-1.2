import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals and small teams just getting started.',
    features: ['100 Products', '1 Warehouse', 'Basic Reporting'],
    current: false,
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For growing businesses that need more power and support.',
    features: ['Unlimited Products', '5 Warehouses', 'Advanced Reporting', 'API Access', 'Email & Chat Support'],
    current: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with complex needs.',
    features: ['Everything in Pro', 'Unlimited Warehouses', 'Dedicated Account Manager', 'Custom Integrations'],
    current: false,
  },
];

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold font-headline">Subscription</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.current ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle className="font-headline">{plan.name}</CardTitle>
              <p className="text-3xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.price.startsWith('$') ? '/month' : ''}</span></p>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.current ? (
                <Button disabled className="w-full">Current Plan</Button>
              ) : (
                <Button variant={plan.name === 'Enterprise' ? 'secondary' : 'default'} className="w-full">
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your payment methods and view billing history.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm">Your next bill for <span className="font-semibold">$49.00</span> is on <span className="font-semibold">August 30, 2024</span>.</p>
        </CardContent>
        <CardFooter className="gap-2">
            <Button variant="outline">Manage Payment</Button>
            <Button variant="ghost">View Billing History</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
