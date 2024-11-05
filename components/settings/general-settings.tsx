'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Settings = () => {
    const [settings, setSettings] = useState({
        name: '',
        email: '',
        language: 'English',
        darkMode: false
    });

    const [activeTab, setActiveTab] = useState('general');

    // Fetch settings from backend
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                const data = await response.json();
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };
        fetchSettings();
    }, []);

    // Handle settings updates
    const updateSetting = async (key: string, value: string | boolean) => {
        try {
            const response = await fetch('/api/settings', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [key]: value }),
            });

            if (response.ok) {
                setSettings(prev => ({ ...prev, [key]: value }));
            }
        } catch (error) {
            console.error('Failed to update setting:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex-grow bg-black-100 p-6">
                <div className="max-w-2xl mx-auto h-full">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                        <TabsList className="mb-6">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="rules">Rules Management</TabsTrigger>
                        </TabsList>

                        <div className="flex-grow overflow-y-auto">
                            <TabsContent value="general">
                                <Card className="h-full">
                                    <CardContent className="pt-6 h-full">
                                        <div className="space-y-6 h-full">
                                            <h2 className="text-xl font-semibold mb-2">General Settings</h2>
                                            <p className="text-gray-600 mb-6">
                                                Manage your account settings and preferences.
                                            </p>

                                            <div className="space-y-4 h-full">
                                                <div className="space-y-2">
                                                    <label className="font-medium">Name</label>
                                                    <Input
                                                        value={settings.name}
                                                        onChange={(e) => updateSetting('name', e.target.value)}
                                                        placeholder="Enter your name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="font-medium">Email</label>
                                                    <Input
                                                        value={settings.email}
                                                        onChange={(e) => updateSetting('email', e.target.value)}
                                                        placeholder="Enter your email"
                                                        type="email"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="font-medium">Language</label>
                                                    <Select
                                                        value={settings.language}
                                                        onValueChange={(value) => updateSetting('language', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="English">English</SelectItem>
                                                            <SelectItem value="Spanish">Spanish</SelectItem>
                                                            <SelectItem value="French">French</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="notifications">
                                <Card className="h-full">
                                    <CardContent className="pt-6 h-full">
                                        <h2 className="text-xl font-semibold">Notifications Settings</h2>
                                        <p className="text-gray-600">Configure your notification preferences.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security">
                                <Card className="h-full">
                                    <CardContent className="pt-6 h-full">
                                        <h2 className="text-xl font-semibold">Security Settings</h2>
                                        <p className="text-gray-600">Manage your security preferences.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="rules">
                                <Card className="h-full">
                                    <CardContent className="pt-6 h-full">
                                        <h2 className="text-xl font-semibold">Rules Management</h2>
                                        <p className="text-gray-600">Configure system rules and policies.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Settings;