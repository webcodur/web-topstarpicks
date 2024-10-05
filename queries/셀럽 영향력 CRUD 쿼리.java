-- Create (삽입)
INSERT INTO celebrity_influence (
    celebrity_id, political, political_exp, strategic, strategic_exp,
    tech, tech_exp, social, social_exp, economic, economic_exp,
    cultural, cultural_exp, transhistoricity, transhistoricity_exp,
    total_score, rank
) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
);

-- Read (조회)
-- 특정 셀럽의 영향력 정보 조회
SELECT * FROM celebrity_influence WHERE celebrity_id = ?;

-- 모든 셀럽의 영향력 정보 조회 (celebrities 테이블과 조인)
SELECT c.name, ci.*
FROM celebrities c
JOIN celebrity_influence ci ON c.id = ci.celebrity_id;

-- Update (수정)
UPDATE celebrity_influence
SET 
    political = ?, political_exp = ?,
    strategic = ?, strategic_exp = ?,
    tech = ?, tech_exp = ?,
    social = ?, social_exp = ?,
    economic = ?, economic_exp = ?,
    cultural = ?, cultural_exp = ?,
    transhistoricity = ?, transhistoricity_exp = ?,
    total_score = ?, rank = ?
WHERE celebrity_id = ?;

-- Delete (삭제)
DELETE FROM celebrity_influence WHERE celebrity_id = ?;