const sqlite3 = require('sqlite3').verbose();
const SQL = require('sql-template-strings');

const DBSOURCE = 'topstarpicks.db';

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error('데이터베이스 연결 오류:', err.message);
		throw err;
	} else {
		console.log(`'${DBSOURCE}' 데이터베이스에 연결됨.`);

		// 데이터베이스 버전 확인
		db.get(SQL`PRAGMA user_version`.sql, (err, row) => {
			if (err) {
				console.error('데이터베이스 버전 확인 오류:', err.message);
			} else {
				console.log('데이터베이스 사용자 버전:', row.user_version);
			}
		});
	}
});

// 공통 쿼리 실행 함수
db.executeQuery = (sql) => {
	return new Promise((resolve, reject) => {
		db.all(sql.text, sql.values, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
};

// 비동기 핸들러 미들웨어
db.asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((error) => {
		res.status(400).json({ error: error.message });
	});
};

module.exports = db;
