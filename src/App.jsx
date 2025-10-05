import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { CheckCircle } from "lucide-react";
import { SurveyProgressBar } from "@/components/SurveyProgressBar.jsx";
import "./App.css";

function App() {
	const [formData, setFormData] = useState({
		department: "",
		hoursPerDay: "",
		devices: [],
		disruptions: "",
		technicalIssues: "",
		supportAction: "",
		supportExperience: "",
		criticalTasks: "",
		softwareSuggestions: "",
		additionalComments: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);

	const totalQuestions = 10;

	useEffect(() => {
		let count = 0;
		if (formData.department) count++;
		if (formData.hoursPerDay) count++;
		if (formData.devices.length > 0) count++;
		if (formData.disruptions) count++;
		if (formData.technicalIssues.trim()) count++;
		if (formData.supportAction) count++;
		if (formData.supportExperience.trim()) count++;
		if (formData.criticalTasks.trim()) count++;
		if (formData.softwareSuggestions.trim()) count++;
		if (formData.additionalComments.trim()) count++;
		setAnsweredQuestions(count);
	}, [formData]);

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleDeviceChange = (device, checked) => {
		setFormData((prev) => ({
			...prev,
			devices: checked ? [...prev.devices, device] : prev.devices.filter((d) => d !== device),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Survey Data:", formData);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
				<Card className="w-full max-w-md text-center">
					<CardContent className="pt-6">
						<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-gray-900 mb-2">Awesome, thanks!</h2>
						<p className="text-gray-600">Your feedback has been submitted successfully!</p>
						<p className="text-gray-600">We really appreciate you taking your time to fill out the survey.</p>
						<p className="text-gray-600">Have a great day!</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-green-500 py-8 px-4">
			<div className="max-w-4xl mx-auto">
				<Card className="bg-lime-200 mb-8 p-8">
					<CardHeader className="text-center">
						<CardTitle className="text-3xl font-bold text-gray-900">Green Toe Textiles</CardTitle>
						<CardDescription className="text-lg text-gray-600">Computer System Feedback Survey</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-700 leading-relaxed">We are considering a computer system upgrade to ensure that all employees have the tools they need to do their very best work.</p>
						<p className="text-gray-700 leading-relaxed">Your feedback is crucial for us understand the pros and cons of our current systems and to identify the needs for a new system to meet.</p>
						<p className="text-gray-700 leading-relaxed">Thanks in advance for your feedback, all kind of feedback is useful, postive, negative, suggestions, even things you are unsure of but want to share. It's all confidential so speak freely!</p>
					</CardContent>

					<form
						onSubmit={handleSubmit}
						className="space-y-8"
					>
						{/* Section 1 - Current Computer Usage */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-gray-900">Current Computer Usage</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<Label
										htmlFor="department"
										className="text-base font-medium"
									>
										1. What is your primary department at Green Toe Textiles?
									</Label>
									<Input
										id="department"
										placeholder="e.g., Sales, Production, Administration, etc."
										value={formData.department}
										onChange={(e) => handleInputChange("department", e.target.value)}
										className="mt-2"
									/>
								</div>

								<div>
									<Label className="text-base font-medium">2. On average, how many hours per day do you use your computer for work-related tasks?</Label>
									<RadioGroup
										value={formData.hoursPerDay}
										onValueChange={(value) => handleInputChange("hoursPerDay", value)}
										className="mt-2"
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="less-than-1"
												id="hours-1"
											/>
											<Label htmlFor="hours-1">Less than 1 hour</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="1-3"
												id="hours-2"
											/>
											<Label htmlFor="hours-2">1-3 hours</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="4-6"
												id="hours-3"
											/>
											<Label htmlFor="hours-3">4-6 hours</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="more-than-6"
												id="hours-4"
											/>
											<Label htmlFor="hours-4">More than 6 hours</Label>
										</div>
									</RadioGroup>
								</div>

								<div>
									<Label className="text-base font-medium">3. Which of the following devices do you use regularly as part of your workstation? (Select all that apply)</Label>
									<div className="mt-2 space-y-2">
										{["Desktop Computer", "Laptop", "Printer", "Scanner", "External Monitor"].map((device) => (
											<div
												key={device}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={device}
													checked={formData.devices.includes(device)}
													onCheckedChange={(checked) => handleDeviceChange(device, checked)}
												/>
												<Label htmlFor={device}>{device}</Label>
											</div>
										))}
										<div className="flex items-center space-x-2">
											<Checkbox
												id="other-device"
												checked={formData.devices.some((d) => d.startsWith("Other:"))}
												onCheckedChange={(checked) => {
													if (!checked) {
														setFormData((prev) => ({
															...prev,
															devices: prev.devices.filter((d) => !d.startsWith("Other:")),
														}));
													}
												}}
											/>
											<Label htmlFor="other-device">Other:</Label>
											<Input
												placeholder="Specify"
												className="flex-1"
												onChange={(e) => {
													const value = e.target.value;
													if (value) {
														handleDeviceChange("Other: " + value, true);
													}
												}}
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Section 2 - System Performance and Reliability */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-gray-900">System Performance and Reliability</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<Label className="text-base font-medium">4. In the past month, how many times have you experienced a significant disruption to your work due to the computer system?</Label>
									<RadioGroup
										value={formData.disruptions}
										onValueChange={(value) => handleInputChange("disruptions", value)}
										className="mt-2"
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="0"
												id="disruptions-1"
											/>
											<Label htmlFor="disruptions-1">0 times</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="1-2"
												id="disruptions-2"
											/>
											<Label htmlFor="disruptions-2">1-2 times</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="3-5"
												id="disruptions-3"
											/>
											<Label htmlFor="disruptions-3">3-5 times</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="more-than-5"
												id="disruptions-4"
											/>
											<Label htmlFor="disruptions-4">More than 5 times</Label>
										</div>
									</RadioGroup>
								</div>

								<div>
									<Label
										htmlFor="technical-issues"
										className="text-base font-medium"
									>
										5. Please describe the nature of the technical issues you have experienced most frequently with the current computer system.
									</Label>
									<Textarea
										id="technical-issues"
										placeholder="Any technical problems you've encountered..."
										value={formData.technicalIssues}
										onChange={(e) => handleInputChange("technicalIssues", e.target.value)}
										className="mt-2"
										rows={4}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Section 3 - Support and Maintenance */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-gray-900">Support and Maintenance</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<Label className="text-base font-medium">6. When you encounter a technical problem, what is your typical course of action?</Label>
									<RadioGroup
										value={formData.supportAction}
										onValueChange={(value) => handleInputChange("supportAction", value)}
										className="mt-2"
									>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="self-resolve"
												id="support-1"
											/>
											<Label htmlFor="support-1">I try to resolve the issue myself</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="ask-coworker"
												id="support-2"
											/>
											<Label htmlFor="support-2">I ask a coworker for help</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="contact-it"
												id="support-3"
											/>
											<Label htmlFor="support-3">I contact the designated IT support person/department</Label>
										</div>
										<div className="flex items-center space-x-2">
											<RadioGroupItem
												value="other"
												id="support-4"
											/>
											<Label htmlFor="support-4">Other</Label>
										</div>
									</RadioGroup>
								</div>

								<div>
									<Label
										htmlFor="support-experience"
										className="text-base font-medium"
									>
										7. Please describe your experience with the current process for resolving computer-related issues. Consider timeliness, communication, and the effectiveness of the solution.
									</Label>
									<Textarea
										id="support-experience"
										placeholder="Experience with technical support..."
										value={formData.supportExperience}
										onChange={(e) => handleInputChange("supportExperience", e.target.value)}
										className="mt-2"
										rows={4}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Section 4 - Future Needs and Suggestions */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-gray-900">Future Needs and Suggestions</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<Label
										htmlFor="critical-tasks"
										className="text-base font-medium"
									>
										8. What are the most critical tasks you perform using your computer? Please list up to three.
									</Label>
									<Textarea
										id="critical-tasks"
										placeholder="Important computer tasks..."
										value={formData.criticalTasks}
										onChange={(e) => handleInputChange("criticalTasks", e.target.value)}
										className="mt-2"
										rows={3}
									/>
								</div>

								<div>
									<Label
										htmlFor="software-suggestions"
										className="text-base font-medium"
									>
										9. Are there any software applications or tools that are not currently available to you that you believe would enhance your productivity?
									</Label>
									<Textarea
										id="software-suggestions"
										placeholder="Software or tools that would help you work more effectively..."
										value={formData.softwareSuggestions}
										onChange={(e) => handleInputChange("softwareSuggestions", e.target.value)}
										className="mt-2"
										rows={3}
									/>
								</div>

								<div>
									<Label
										htmlFor="additional-comments"
										className="text-base font-medium"
									>
										10. Do you have any other suggestions or comments regarding the computer systems at Green Toe Textiles?
									</Label>
									<Textarea
										id="additional-comments"
										placeholder="Additional thoughts or suggestions..."
										value={formData.additionalComments}
										onChange={(e) => handleInputChange("additionalComments", e.target.value)}
										className="mt-2"
										rows={4}
									/>
								</div>
							</CardContent>
						</Card>

						<div className="flex justify-center">
							<Button
								type="submit"
								size="lg"
								className="px-8 py-3 text-lg bg-green-900"
							>
								Submit Survey
							</Button>
						</div>
					</form>

					<div className="mt-8 text-center">
						<p className="text-gray-600 text-sm">Thank you for your valuable input! Your responses are confidential and will be used solely for system improvement purposes.</p>
					</div>
				</Card>
			</div>
			<SurveyProgressBar
				currentQuestion={answeredQuestions}
				totalQuestions={totalQuestions}
			/>
		</div>
	);
}

export default App;
