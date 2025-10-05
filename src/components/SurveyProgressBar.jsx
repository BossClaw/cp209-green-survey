import { Progress } from "@/components/ui/progress";

export function SurveyProgressBar({ currentQuestion, totalQuestions }) {
	const progress = (currentQuestion / totalQuestions) * 100;

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
			<div className="max-w-4xl mx-auto px-4 py-3">
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm font-medium text-gray-700">
						Question {currentQuestion} of {totalQuestions}
					</span>
					<span className="text-sm font-medium text-gray-700">{Math.round(progress)}% Complete</span>
				</div>
				<Progress value={progress} className="h-2" />
			</div>
		</div>
	);
}
