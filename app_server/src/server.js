// 필요한 모듈 불러오기
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 라우터 파일 불러오기
const routes_celebrities = require('./routes/celebrities');
const routes_recommendations = require('./routes/recommendations');
const routes_content = require('./routes/content');
const routes_profession = require('./routes/profession');
const routes_ai = require('./routes/ai');

// Express 애플리케이션 생성
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3002',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// API 라우트 설정
app.use('/api/celebrities', routes_celebrities);
app.use('/api/recommendations', routes_recommendations);
app.use('/api/content', routes_content);
app.use('/api/profession', routes_profession);
app.use('/api/ai', routes_ai);

// 글로벌 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
	console.error('서버 오류:', err.stack);
	res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
});

// 서버 시작
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

module.exports = app;
