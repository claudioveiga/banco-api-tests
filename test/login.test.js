const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
	describe('POST /login', () => {
		it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
			const bodyLogin = { ...postLogin }
			
			const resposta = await request(process.env.BASE_URL)
				.post('/login')
				.set('Content-Type', 'application/json')
				.send(bodyLogin)
				
			expect(resposta.status).to.equal(200);
			expect(resposta.body.token).to.be.a('string');
		})
        it('Deve retornar 400 ao não ser enviadas as credenciais', async () => {
            const bodyLogin = { ...postLogin }
			bodyLogin.username = ""
			bodyLogin.senha = ""
			
			const resposta = await request(process.env.BASE_URL)
				.post('/login')
				.set('Content-Type', 'application/json')
				.send(bodyLogin)
			expect(resposta.status).to.equal(400);
        })
        it('Deve retornar 401 ao enviar as credenciais erradas', async () => {
            const bodyLogin = {...postLogin}
			bodyLogin.username = "sdfsd"
			bodyLogin.senha = "fdgbdf"
			
			const resposta = await request('http://localhost:3000')
				.post('/login')
				.set('Content-Type', 'application/json')
				.send(bodyLogin)
			expect(resposta.status).to.equal(401);
        })
		it('Deve retornar 401 ao enviar as credenciais erradas', async () => {
            const bodyLogin = {...postLogin}
			bodyLogin.username = "claudio.veiga"
			bodyLogin.senha = "fdgbdf"
			
			const resposta = await request('http://localhost:3000')
				.post('/login')
				.set('Content-Type', 'application/json')
				.send(bodyLogin)
			expect(resposta.status).to.equal(401);
        })
    })
    describe('PUT /login', () => {
        it('Deve retornar 405 ao enviar o método errado', async () => {
            const bodyLogin = {...postLogin}
			
			const resposta = await request('http://localhost:3000')
				.put('/login')
				.set('Content-Type', 'application/json')
				.send(bodyLogin)

            console.log(resposta.status)
			expect(resposta.status).to.equal(405);
        })
    })
})