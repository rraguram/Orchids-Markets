import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from \"@/components/ui/card\";

const UserNotRegisteredError = () => {
    return (
        <div className=\"flex items-center justify-center p-6\">\n            <Card className=\"max-w-md w-full border-red-200\">\n                <CardHeader className=\"space-y-1\">\n                    <CardTitle className=\"text-2xl font-bold text-red-600\">Registration Required</CardTitle>\n                    <CardDescription>\n                        Please complete your registration to access this feature.\n                    </CardDescription>\n                </CardHeader>\n                <CardContent>\n                    <p className=\"text-gray-600 mb-4\">\n                        We couldn't find an active registration for your account. Please click the button below to sign up and start tracking your portfolio.\n                    </p>\n                    <button className=\"w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200\">\n                        Sign Up Now\n                    </button>\n                </CardContent>\n            </Card>\n        </div>
    );\n};\n\nexport default UserNotRegisteredError;
