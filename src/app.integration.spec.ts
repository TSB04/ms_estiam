import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { Commande } from './commande/entities/commande.entity';
import { Plat } from './plat/entities/plat.entity';
import { Restaurent } from './restaurent/entities/restaurent.entity';
import { Livreur } from './livreur/entities/livreur.entity';
import { User } from '../src/users/entities/user.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let platRepository: Repository<Plat>;
  let restaurentRepository: Repository<Restaurent>;
  let livreurRepository: Repository<Livreur>;
  let commandeRepository: Repository<Commande>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Plat, Restaurent, Livreur, Commande, User],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    platRepository = moduleFixture.get('PlatRepository');
    restaurentRepository = moduleFixture.get('RestaurentRepository');
    livreurRepository = moduleFixture.get('LivreurRepository');
    commandeRepository = moduleFixture.get('CommandeRepository');
    userRepository = moduleFixture.get('UserRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  // Plat tests
  it('/plats (POST) should create a plat', async () => {
    const createPlatDto = { name: 'testplat', price: 10.99 };
    const response = await request(app.getHttpServer())
      .post('/plats')
      .send(createPlatDto)
      .expect(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...createPlatDto,
    });

    const plats = await platRepository.find();
    expect(plats).toHaveLength(1);
    expect(plats[0].name).toBe(createPlatDto.name);
  });

  it('/plats (GET) should return all plats', async () => {
    const plat = platRepository.create({ name: 'testplat', price: 10.99 });
    await platRepository.save(plat);

    const response = await request(app.getHttpServer())
      .get('/plats')
      .expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe(plat.name);
  });

  it('/plats/:id (GET) should return a plat by id', async () => {
    const plat = platRepository.create({ name: 'testplat', price: 10.99 });
    await platRepository.save(plat);

    const response = await request(app.getHttpServer())
      .get(`/plats/${plat.id}`)
      .expect(200);
    expect(response.body).toMatchObject({ id: plat.id, name: plat.name });
  });

  it('/plats/:id (PATCH) should update a plat', async () => {
    const plat = platRepository.create({ name: 'testplat', price: 10.99 });
    await platRepository.save(plat);

    const updatePlatDto = { name: 'updatedplat' };
    const response = await request(app.getHttpServer())
      .patch(`/plats/${plat.id}`)
      .send(updatePlatDto)
      .expect(200);
    expect(response.body.name).toBe(updatePlatDto.name);

    const updatedPlat = await platRepository.findOne({
      where: { id: plat.id },
    });
    expect(updatedPlat.name).toBe(updatePlatDto.name);
  });

  it('/plats/:id (DELETE) should remove a plat', async () => {
    const plat = platRepository.create({ name: 'testplat', price: 10.99 });
    await platRepository.save(plat);

    await request(app.getHttpServer()).delete(`/plats/${plat.id}`).expect(200);
    const deletedPlat = await platRepository.findOne({
      where: { id: plat.id },
    });
    expect(deletedPlat).toBeUndefined();
  });

  // Restaurent tests
  it('/restaurents (POST) should create a restaurent', async () => {
    const createRestaurentDto = {
      name: 'testrestaurent',
      location: 'testlocation',
    };
    const response = await request(app.getHttpServer())
      .post('/restaurents')
      .send(createRestaurentDto)
      .expect(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...createRestaurentDto,
    });

    const restaurents = await restaurentRepository.find();
    expect(restaurents).toHaveLength(1);
    expect(restaurents[0].name).toBe(createRestaurentDto.name);
  });

  it('/restaurents (GET) should return all restaurents', async () => {
    const restaurent = restaurentRepository.create({
      name: 'testrestaurent',
      location: 'testlocation',
    });
    await restaurentRepository.save(restaurent);

    const response = await request(app.getHttpServer())
      .get('/restaurents')
      .expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe(restaurent.name);
  });

  it('/restaurents/:id (GET) should return a restaurent by id', async () => {
    const restaurent = restaurentRepository.create({
      name: 'testrestaurent',
      location: 'testlocation',
    });
    await restaurentRepository.save(restaurent);

    const response = await request(app.getHttpServer())
      .get(`/restaurents/${restaurent.id}`)
      .expect(200);
    expect(response.body).toMatchObject({
      id: restaurent.id,
      name: restaurent.name,
    });
  });

  it('/restaurents/:id (PATCH) should update a restaurent', async () => {
    const restaurent = restaurentRepository.create({
      name: 'testrestaurent',
      location: 'testlocation',
    });
    await restaurentRepository.save(restaurent);

    const updateRestaurentDto = { name: 'updatedrestaurent' };
    const response = await request(app.getHttpServer())
      .patch(`/restaurents/${restaurent.id}`)
      .send(updateRestaurentDto)
      .expect(200);
    expect(response.body.name).toBe(updateRestaurentDto.name);

    const updatedRestaurent = await restaurentRepository.findOne({
      where: { id: restaurent.id },
    });
    expect(updatedRestaurent.name).toBe(updateRestaurentDto.name);
  });

  it('/restaurents/:id (DELETE) should remove a restaurent', async () => {
    const restaurent = restaurentRepository.create({
      name: 'testrestaurent',
      location: 'testlocation',
    });
    await restaurentRepository.save(restaurent);

    await request(app.getHttpServer())
      .delete(`/restaurents/${restaurent.id}`)
      .expect(200);
    const deletedRestaurent = await restaurentRepository.findOne({
      where: { id: restaurent.id },
    });
    expect(deletedRestaurent).toBeUndefined();
  });

  // Livreur tests
  it('/livreurs (POST) should create a livreur', async () => {
    const createLivreurDto = { name: 'testlivreur', contact_info: '123456789' };
    const response = await request(app.getHttpServer())
      .post('/livreurs')
      .send(createLivreurDto)
      .expect(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...createLivreurDto,
    });

    const livreurs = await livreurRepository.find();
    expect(livreurs).toHaveLength(1);
    expect(livreurs[0].name).toBe(createLivreurDto.name);
  });

  it('/livreurs (GET) should return all livreurs', async () => {
    const livreur = livreurRepository.create([
      { name: 'testlivreur', contact_info: '123456789' },
    ]);
    await livreurRepository.save(livreur);

    const response = await request(app.getHttpServer())
      .get('/livreurs')
      .expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe(livreur[0].name);
  });

  it('/livreurs/:id (GET) should return a livreur by id', async () => {
    const livreur = livreurRepository.create({
      name: 'testlivreur',
      contact_info: '123456789',
    });
    await livreurRepository.save(livreur);

    const response = await request(app.getHttpServer())
      .get(`/livreurs/${livreur.id}`)
      .expect(200);
    expect(response.body).toMatchObject({ id: livreur.id, name: livreur.name });
  });

  it('/livreurs/:id (PATCH) should update a livreur', async () => {
    const livreur = livreurRepository.create({
      name: 'testlivreur',
      contact_info: '123456789',
    });
    await livreurRepository.save(livreur);

    const updateLivreurDto = { name: 'updatedlivreur' };
    const response = await request(app.getHttpServer())
      .patch(`/livreurs/${livreur.id}`)
      .send(updateLivreurDto)
      .expect(200);
    expect(response.body.name).toBe(updateLivreurDto.name);

    const updatedLivreur = await livreurRepository.findOne({
      where: { id: livreur.id },
    });
    expect(updatedLivreur.name).toBe(updateLivreurDto.name);
  });

  it('/livreurs/:id (DELETE) should remove a livreur', async () => {
    const livreur = livreurRepository.create({
      name: 'testlivreur',
      contact_info: '123456789',
    });
    await livreurRepository.save(livreur);

    await request(app.getHttpServer())
      .delete(`/livreurs/${livreur.id}`)
      .expect(200);
    const deletedLivreur = await livreurRepository.findOne({
      where: { id: livreur.id },
    });
    expect(deletedLivreur).toBeUndefined();
  });

  // Commande tests
  it('/commandes (POST) should create a commande', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const createCommandeDto = {
      restaurant_id: 1,
      plat_id: 1,
      quantity: 2,
      date: new Date().toISOString(),
    };
    const response = await request(app.getHttpServer())
      .post(`/commandes`)
      .send({ ...createCommandeDto, userId: user.id })
      .expect(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      ...createCommandeDto,
      user: expect.any(Object),
    });

    const commandes = await commandeRepository.find();
    expect(commandes).toHaveLength(1);
    expect(commandes[0].quantity).toBe(createCommandeDto.quantity);
  });

  it('/commandes/user/:userId (GET) should return all commandes for a user', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const commande = commandeRepository.create({
      user,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 2,
      date: new Date().toISOString(),
    });
    await commandeRepository.save(commande);

    const response = await request(app.getHttpServer())
      .get(`/commandes/user/${user.id}`)
      .expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].quantity).toBe(commande.quantity);
  });

  it('/commandes/:id (GET) should return a commande by id', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const commande = commandeRepository.create({
      user,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 2,
      date: new Date().toISOString(),
    });
    await commandeRepository.save(commande);

    const response = await request(app.getHttpServer())
      .get(`/commandes/${commande.id}`)
      .expect(200);
    expect(response.body).toMatchObject({
      id: commande.id,
      quantity: commande.quantity,
    });
  });

  it('/commandes/:id (PATCH) should update a commande', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const commande = commandeRepository.create({
      user,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 2,
      date: new Date().toISOString(),
    });
    await commandeRepository.save(commande);

    const updateCommandeDto = { quantity: 3 };
    const response = await request(app.getHttpServer())
      .patch(`/commandes/${commande.id}`)
      .send(updateCommandeDto)
      .expect(200);
    expect(response.body.quantity).toBe(updateCommandeDto.quantity);

    const updatedCommande = await commandeRepository.findOne({
      where: { id: commande.id },
    });
    expect(updatedCommande.quantity).toBe(updateCommandeDto.quantity);
  });

  it('/commandes/:id (DELETE) should remove a commande', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const commande = commandeRepository.create({
      user,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 2,
      date: new Date().toISOString(),
    });
    await commandeRepository.save(commande);

    await request(app.getHttpServer())
      .delete(`/commandes/${commande.id}`)
      .expect(200);
    const deletedCommande = await commandeRepository.findOne({
      where: { id: commande.id },
    });
    expect(deletedCommande).toBeUndefined();
  });

  // User tests
  it('/users (POST) should create a user', async () => {
    const createUserDto = { username: 'testuser', password: 'password' };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      username: createUserDto.username,
    });

    const users = await userRepository.find();
    expect(users).toHaveLength(1);
    expect(users[0].username).toBe(createUserDto.username);
  });

  it('/users (GET) should return all users', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].username).toBe(user.username);
  });

  it('/users/:id (GET) should return a user by id', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const response = await request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .expect(200);
    expect(response.body).toMatchObject({
      id: user.id,
      username: user.username,
    });
  });

  it('/users/:id (PATCH) should update a user', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    const updateUserDto = { username: 'updateduser' };
    const response = await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(updateUserDto)
      .expect(200);
    expect(response.body.username).toBe(updateUserDto.username);

    const updatedUser = await userRepository.findOne({
      where: { id: user.id },
    });
    expect(updatedUser.username).toBe(updateUserDto.username);
  });

  it('/users/:id (DELETE) should remove a user', async () => {
    const user = userRepository.create({
      username: 'testuser',
      password: 'password',
    });
    await userRepository.save(user);

    await request(app.getHttpServer()).delete(`/users/${user.id}`).expect(200);
    const deletedUser = await userRepository.findOne({
      where: { id: user.id },
    });
    expect(deletedUser).toBeUndefined();
  });
});
