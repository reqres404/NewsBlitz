import type React from "react"

import { ArrowLeft, Send } from "lucide-react"
import { useState } from "react"
import { Link } from "wouter"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Textarea } from "../components/ui/textarea"
import { toast } from "../hooks/useToast"

export default function Feedback() {
    const [feedbackType, setFeedbackType] = useState("suggestion")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000))

        toast({
            title: "Feedback submitted",
            description: "Thank you for your feedback! We appreciate your input.",
        })

        setIsSubmitting(false)
        // Reset form here if needed
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container py-8 md:py-12">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to home
                        </Link>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight">Share Your Feedback</h1>
                        <p className="mt-2 text-muted-foreground">
                            We value your input to help us improve our news service. Please share your thoughts with us.
                        </p>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Feedback Form</CardTitle>
                                <CardDescription>
                                    Let us know what you think about our app. All fields marked with * are required.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Feedback Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="feedback-type">Feedback Type *</Label>
                                    <RadioGroup
                                        defaultValue="suggestion"
                                        value={feedbackType}
                                        onValueChange={setFeedbackType}
                                        className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="suggestion" id="suggestion" />
                                            <Label htmlFor="suggestion" className="cursor-pointer">
                                                Suggestion
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="issue" id="issue" />
                                            <Label htmlFor="issue" className="cursor-pointer">
                                                Report Issue
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="praise" id="praise" />
                                            <Label htmlFor="praise" className="cursor-pointer">
                                                Praise
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select defaultValue="content">
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="content">Content Quality</SelectItem>
                                            <SelectItem value="design">User Interface</SelectItem>
                                            <SelectItem value="performance">App Performance</SelectItem>
                                            <SelectItem value="features">Features</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Your name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input id="email" type="email" placeholder="your.email@example.com" required />
                                    </div>
                                </div>

                                {/* Feedback Message */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Feedback *</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Please share your detailed feedback here..."
                                        className="min-h-[120px]"
                                        required
                                    />
                                </div>

                                {/* Rating */}
                                {feedbackType === "praise" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="rating">How would you rate our app? *</Label>
                                        <Select defaultValue="5">
                                            <SelectTrigger id="rating">
                                                <SelectValue placeholder="Select rating" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="5">5 - Excellent</SelectItem>
                                                <SelectItem value="4">4 - Very Good</SelectItem>
                                                <SelectItem value="3">3 - Good</SelectItem>
                                                <SelectItem value="2">2 - Fair</SelectItem>
                                                <SelectItem value="1">1 - Poor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Issue Details */}
                                {feedbackType === "issue" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="device">Device Information</Label>
                                        <Input id="device" placeholder="e.g., iPhone 13, Chrome on Windows" />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" type="button" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Submitting...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="h-4 w-4" />
                                            Submit Feedback
                                        </span>
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
                    <p className="text-sm text-muted-foreground">© 2025 NewsBlitz. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/feedback" className="text-sm text-muted-foreground hover:text-foreground">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

