import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Info } from 'lucide-react';
import RadarChart from './raderChart/RadarChart';
import BarChart from './barChart/BarChart';
import TotalScoreComponent from './totlaScore/TotalScoreComponent';
import { calculateGrade } from './scoreUtils';

const ScoreModal = ({ person, open, onClose }) => {
	const [activeTab, setActiveTab] = useState('category');

	const categoryScore =
		person?.political +
		person?.strategic +
		person?.tech +
		person?.social +
		person?.cultural +
		person?.economic;

	if (!person) return null;
	const totalScore = person.total_score;
	const grade = calculateGrade(totalScore);
	person.grade = grade;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md w-[340px] max-h-[800px] overflow-y-auto">
				<div className="flex items-center justify-center mb-5">
					<h2 className="text-xl font-bold text-center">
						{person.name}의 영향력
					</h2>
					<Button
						variant="ghost"
						size="sm"
						className="ml-2 p-2 h-auto"
						title="영향력 스펙트럼은 chatGPT를 통해 인물별 영향력 지표를 시각화한 것입니다.">
						<Info className="h-4 w-4" />
					</Button>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-5">
						<TabsTrigger value="category" className="text-xs p-2">
							분야별: {categoryScore}
						</TabsTrigger>
						<TabsTrigger value="trans" className="text-xs p-2">
							통시성: {person.transhistoricity}
						</TabsTrigger>
						<TabsTrigger value="total" className="text-xs p-2">
							총점: {person.total_score}
						</TabsTrigger>
					</TabsList>

					<div className="flex-grow overflow-y-auto mt-5">
						{/* 레이더 차트 */}
						<TabsContent value="category" className="py-5">
							<RadarChart person={person} />
						</TabsContent>
						{/* 바 차트*/}
						<TabsContent value="trans" className="py-5">
							<BarChart
								transhistoricity={person.transhistoricity}
								exp={person.transhistoricity_exp}
							/>
						</TabsContent>
						{/* 총점 */}
						<TabsContent value="total" className="py-5">
							<TotalScoreComponent person={person} />
						</TabsContent>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default ScoreModal;
