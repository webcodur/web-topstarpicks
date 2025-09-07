import React from 'react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { ChevronDown, Check, Trash2 } from 'lucide-react';

// Simple table row component for recommendations
export const RecsTableRow = ({
	row,
	celebrities,
	categoriesMap,
	contentIdMap,
	onSave,
	onDelete,
	onUpdate,
}) => {
	const [isEditing, setIsEditing] = React.useState(false);
	const [editData, setEditData] = React.useState({ ...row });

	const selectedCelebrity = celebrities.find(
		(c) => c.id === editData.celebrity_id
	);
	const selectedContentType = editData.content_name;

	const handleSave = () => {
		onUpdate(row.id, editData);
		onSave(row.id);
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditData({ ...row });
		setIsEditing(false);
	};

	const handleCelebritySelect = (celebrity) => {
		setEditData((prev) => ({ ...prev, celebrity_id: celebrity.id }));
	};

	const handleContentTypeSelect = (contentName) => {
		setEditData((prev) => ({
			...prev,
			content_name: contentName,
			content_id: contentIdMap[contentName] || '',
		}));
	};

	if (isEditing) {
		return (
			<tr className="border-b">
				<td className="p-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="w-full justify-between text-xs">
								{selectedCelebrity?.name || '선택'}
								<ChevronDown className="h-3 w-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{celebrities.map((celebrity) => (
								<DropdownMenuItem
									key={celebrity.id}
									onSelect={() => handleCelebritySelect(celebrity)}
								>
									{celebrity.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</td>
				<td className="p-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="w-full justify-between text-xs">
								{selectedContentType || '선택'}
								<ChevronDown className="h-3 w-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{Object.values(categoriesMap).map((type) => (
								<DropdownMenuItem
									key={type}
									onSelect={() => handleContentTypeSelect(type)}
								>
									{type}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</td>
				<td className="p-2">
					<Input
						value={editData.title}
						onChange={(e) =>
							setEditData((prev) => ({ ...prev, title: e.target.value }))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<Input
						value={editData.creator}
						onChange={(e) =>
							setEditData((prev) => ({ ...prev, creator: e.target.value }))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<Input
						value={editData.release_date}
						onChange={(e) =>
							setEditData((prev) => ({ ...prev, release_date: e.target.value }))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<textarea
						value={editData.recommendation_text}
						onChange={(e) =>
							setEditData((prev) => ({
								...prev,
								recommendation_text: e.target.value,
							}))
						}
						rows={3}
						className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
					/>
				</td>
				<td className="p-2">
					<Input
						value={editData.recommendation_source}
						onChange={(e) =>
							setEditData((prev) => ({
								...prev,
								recommendation_source: e.target.value,
							}))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<Input
						value={editData.img_link}
						onChange={(e) =>
							setEditData((prev) => ({ ...prev, img_link: e.target.value }))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<Input
						value={editData.affiliate_link}
						onChange={(e) =>
							setEditData((prev) => ({
								...prev,
								affiliate_link: e.target.value,
							}))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<Input
						value={editData.mediaDescription}
						onChange={(e) =>
							setEditData((prev) => ({
								...prev,
								mediaDescription: e.target.value,
							}))
						}
						className="text-xs"
					/>
				</td>
				<td className="p-2">
					<div className="flex gap-1">
						<Button size="sm" onClick={handleSave} className="p-1">
							<Check className="h-3 w-3" />
						</Button>
						<Button size="sm" variant="outline" onClick={handleCancel} className="p-1">
							취소
						</Button>
					</div>
				</td>
			</tr>
		);
	}

	return (
		<tr className="border-b hover:bg-gray-50">
			<td className="p-2 text-xs">{selectedCelebrity?.name || '-'}</td>
			<td className="p-2 text-xs">{selectedContentType || '-'}</td>
			<td className="p-2 text-xs">{row.title || '-'}</td>
			<td className="p-2 text-xs">{row.creator || '-'}</td>
			<td className="p-2 text-xs">{row.release_date || '-'}</td>
			<td className="p-2 text-xs max-w-[200px]">
				<div className="truncate" title={row.recommendation_text}>
					{row.recommendation_text || '-'}
				</div>
			</td>
			<td className="p-2 text-xs">{row.recommendation_source || '-'}</td>
			<td className="p-2 text-xs max-w-[200px]">
				<div className="truncate" title={row.img_link}>
					{row.img_link || '-'}
				</div>
			</td>
			<td className="p-2 text-xs max-w-[200px]">
				<div className="truncate" title={row.affiliate_link}>
					{row.affiliate_link || '-'}
				</div>
			</td>
			<td className="p-2 text-xs max-w-[200px]">
				<div className="truncate" title={row.mediaDescription}>
					{row.mediaDescription || '-'}
				</div>
			</td>
			<td className="p-2">
				<div className="flex gap-1">
					<Button
						size="sm"
						variant="outline"
						onClick={() => setIsEditing(true)}
						className="p-1 text-xs"
					>
						편집
					</Button>
					{(row.isNew || row.isEdited) && (
						<Button
							size="sm"
							onClick={() => onSave(row.id)}
							className="p-1"
						>
							<Check className="h-3 w-3" />
						</Button>
					)}
					<Button
						size="sm"
						variant="destructive"
						onClick={() => onDelete(row.id)}
						className="p-1"
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>
			</td>
		</tr>
	);
};