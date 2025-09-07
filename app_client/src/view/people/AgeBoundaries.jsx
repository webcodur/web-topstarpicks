// AgeBoundaries.jsx
import React from 'react';
import { Input } from '../../components/ui';
import { Label } from '../../components/ui';

const AgeBoundaries = ({ eraBoundaries, setEraBoundaries }) => {
	const handleEraBoundaryChange = (era) => (event) => {
		setEraBoundaries((prev) => ({
			...prev,
			[era]: parseInt(event.target.value),
		}));
	};

	return (
		<div className="flex justify-between mb-4 gap-4">
			<div className="w-1/5">
				<Label htmlFor="ancient">고대/중세 경계 (서로마 제국 멸망)</Label>
				<Input
					id="ancient"
					type="number"
					value={eraBoundaries.ancient}
					onChange={handleEraBoundaryChange('ancient')}
				/>
			</div>
			<div className="w-1/5">
				<Label htmlFor="medieval">중세/근대 경계 (동로마 제국 멸망)</Label>
				<Input
					id="medieval"
					type="number"
					value={eraBoundaries.medieval}
					onChange={handleEraBoundaryChange('medieval')}
				/>
			</div>
			<div className="w-1/5">
				<Label htmlFor="early_modern">근대/현대 경계 (프랑스 대혁명)</Label>
				<Input
					id="early_modern"
					type="number"
					value={eraBoundaries.early_modern}
					onChange={handleEraBoundaryChange('early_modern')}
				/>
			</div>
			<div className="w-1/5">
				<Label htmlFor="modern">현재 (2차 세계대전)</Label>
				<Input
					id="modern"
					type="number"
					value={eraBoundaries.modern}
					onChange={handleEraBoundaryChange('modern')}
				/>
			</div>
		</div>
	);
};

export default AgeBoundaries;
