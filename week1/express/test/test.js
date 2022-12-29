const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server/server');

// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

let token = '';
let taskId = '';
let userId = '';
let testTask = null;

describe('Tasks component', () => {
    it('It should have fail POST user auth!', (done) => {
        const user = {
            email: 'trawwe1r@gmail.com',
            password: 'test_0010',
        };

        chai.request(server)
            .post('/v1/users/sign-in')
            .send(user)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (error) {
                    error.should.have.status(403);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                }

                done();
            });
    });
    it('It should have success POST user auth', (done) => {
        const user = {
            email: 'trawwe1r@gmail.com',
            password: 'test_001',
        };

        chai.request(server)
            .post('/v1/users/sign-in')
            .send(user)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');

                    if (res.body && res.body.token) {
                        token = res.body.token;
                    }
                }

                done();
            });
    });
    it('It should GET all the tasks', (done) => {
        chai.request(server)
            .get('/v1/tasks')
            .set('Authorization', token)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('tasks');
                    if (res.body && res.body.data && res.body.data.tasks) {
                        const task = res.body.data.tasks[0];

                        taskId = task._id;
                        userId = task.assignee;
                    }
                }

                done();
            });
    });
    it('It should GET one task', (done) => {
        chai.request(server)
            .get('/v1/tasks/'.concat(taskId))
            .set('Authorization', token)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                }

                done();
            });
    });
    it('It should create new task', (done) => {
        const task = {
            title: 'Test task',
            description: 'Test description',
            assignee: userId,
        };

        chai.request(server)
            .post('/v1/tasks/')
            .set('Authorization', token)
            .send(task)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.have.eq('Created');
                    res.body.should.have.property('data');
                    if (res.body && res.body.data) {
                        testTask = res.body.data;
                    }
                }

                done();
            });
    });
    it('It should update estiamated time of the test task', (done) => {
        const task = {
            estimatedTime: 150,
        };

        chai.request(server)
            .patch('/v1/tasks/'.concat(testTask._id))
            .set('Authorization', token)
            .send(task)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.have.eq('Success');
                    res.body.should.have.property('data');
                    res.body.data.assignee.should.have.eq(testTask.assignee);
                    res.body.data.estimatedTime.should.have.eq(task.estimatedTime);
                }

                done();
            });
    });
    it('It should delete the test task', (done) => {
        chai.request(server)
            .delete('/v1/tasks/'.concat(testTask._id))
            .set('Authorization', token)
            .end((error, res) => {
                if (error) {
                    console.error(error);
                }
                if (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.have.eq('Success');
                    res.body.should.have.property('data');
                }

                done();
            });
    });
});
