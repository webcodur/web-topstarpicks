import React, { Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

const AccordionSection = React.memo(
	({ expanded, onChange, title, children }) => (
		<Card className="w-full">
			<div 
				className="flex items-center justify-between p-4 bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
				onClick={(e) => onChange(e, !expanded)}
				aria-controls={`${title.toLowerCase()}-content`}
				id={`${title.toLowerCase()}-header`}
			>
				<h3 className="font-semibold">{title}</h3>
				<ChevronDown 
					className={`w-5 h-5 transition-transform duration-200 ${
						expanded ? 'transform rotate-180' : ''
					}`}
				/>
			</div>
			{expanded && (
				<CardContent className="p-4">
					<Suspense fallback={
						<div className="flex justify-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
						</div>
					}>
						{children}
					</Suspense>
				</CardContent>
			)}
		</Card>
	)
);

export default AccordionSection;
