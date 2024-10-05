CREATE TABLE celebrity_influence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    celebrity_id INTEGER NOT NULL,
    political INTEGER NOT NULL CHECK (political BETWEEN 0 AND 10),
    political_exp TEXT NOT NULL,
    strategic INTEGER NOT NULL CHECK (strategic BETWEEN 0 AND 10),
    strategic_exp TEXT NOT NULL,
    tech INTEGER NOT NULL CHECK (tech BETWEEN 0 AND 10),
    tech_exp TEXT NOT NULL,
    social INTEGER NOT NULL CHECK (social BETWEEN 0 AND 10),
    social_exp TEXT NOT NULL,
    economic INTEGER NOT NULL CHECK (economic BETWEEN 0 AND 10),
    economic_exp TEXT NOT NULL,
    cultural INTEGER NOT NULL CHECK (cultural BETWEEN 0 AND 10),
    cultural_exp TEXT NOT NULL,
    transhistoricity INTEGER NOT NULL CHECK (transhistoricity BETWEEN 0 AND 40),
    transhistoricity_exp TEXT NOT NULL,
    total_score INTEGER NOT NULL,
    rank CHAR(1) NOT NULL CHECK (rank IN ('S', 'A', 'B', 'C', 'D')),
    FOREIGN KEY (celebrity_id) REFERENCES celebrities(id)
);

CREATE INDEX idx_celebrity_influence_celebrity_id ON celebrity_influence(celebrity_id);