const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Login', () => {
	describe('POST /login', () => {
		it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
			const resposta = await request(process.env.BASE_URL)
				.post('/login')
				.set('Content-Type', 'application/json')
				.send({
					'username': 'julio.lima',
					'senha': '123456'
				})
			expect(resposta.status).to.equal(200);
			expect(resposta.body.token).to.be.a('string');
		})
        it('Deve retornar 400 ao não ser enviadas as credenciais', async () => {
            const resposta = await request('http://localhost:3000')
				.post('/login')
				.set('Content-Type', 'application/json')
				.send({
					'username': '',
					'senha': ''
				})
			expect(resposta.status).to.equal(400);
        })
        it('Deve retornar 401 ao enviar as credenciais erradas', async () => {
            const resposta = await request('http://localhost:3000')
				.post('/login')
				.set('Content-Type', 'application/json')
				.send({
					'username': 'sdfsd',
					'senha': 'gfhg'
				})
			expect(resposta.status).to.equal(401);
        })
    })
    describe('PUT /login', () => {
        it('Deve retornar 405 ao enviar o método errado', async () => {
            const resposta = await request('http://localhost:3000')
				.put('/login')
				.set('Content-Type', 'application/json')
				.send({
					'username': 'julio.lima',
					'senha': '123456'
				})

            console.log(resposta.status)
			expect(resposta.status).to.equal(405);
        })
    })
})