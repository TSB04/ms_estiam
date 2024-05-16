import { Test, TestingModule } from '@nestjs/testing';
import { CommandeController } from './commande.controller';
import { CommandeService } from './commande.service';
import { Commande } from './entities/commande.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateCommandeDto } from './dto/update-commande.dto';

// Correctly mock AuthGuard
jest.mock('@nestjs/passport', () => ({
  AuthGuard: (strategy: string) => {
    return class MockAuthGuard {
      canActivate() {
        return true;
      }
    };
  },
}));

describe('CommandeController', () => {
  let controller: CommandeController;
  let service: CommandeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommandeController],
      providers: [
        {
          provide: CommandeService,
          useValue: {
            create: jest.fn(),
            findAllByUser: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommandeController>(CommandeController);
    service = module.get<CommandeService>(CommandeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a commande', async () => {
    const commandeData: Commande = {
      id: 1,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 1,
      date: new Date(),
      user: new User(),
      validateQuantity: async function (
        availableQuantity: number,
      ): Promise<boolean> {
        return availableQuantity >= this.quantity;
      },
    };
    jest.spyOn(service, 'create').mockResolvedValueOnce(commandeData);
    const createdCommande = await controller.create(commandeData, {
      user: { id: 1 },
    });
    expect(createdCommande).toEqual(commandeData);
  });

  it('should find all commandes by user', async () => {
    const commandesData: Commande[] = [
      {
        id: 1,
        restaurant_id: 1,
        plat_id: 1,
        quantity: 1,
        date: new Date('2021-12-30'),
        user: new User(),
        validateQuantity: async function (
          availableQuantity: number,
        ): Promise<boolean> {
          return availableQuantity >= this.quantity;
        },
      },
    ];
    jest.spyOn(service, 'findAllByUser').mockResolvedValueOnce(commandesData);
    const foundCommandes = await controller.findAll({ user: { id: 1 } });
    expect(foundCommandes).toEqual(commandesData);
  });

  it('should find one commande by id', async () => {
    const commandeData: Commande = {
      id: 1,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 1,
      date: new Date(),
      user: new User(),
      validateQuantity: async function (
        availableQuantity: number,
      ): Promise<boolean> {
        return availableQuantity >= this.quantity;
      },
    };
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(commandeData);
    const foundCommande = await controller.findOne('1');
    expect(foundCommande).toEqual(commandeData);
  });

  it('should update a commande', async () => {
    const commandeData: Commande = {
      id: 1,
      restaurant_id: 1,
      plat_id: 1,
      quantity: 1,
      date: new Date(),
      user: new User(),
      validateQuantity: async function (
        availableQuantity: number,
      ): Promise<boolean> {
        return availableQuantity >= this.quantity;
      },
    };
    const updateData: UpdateCommandeDto = { quantity: 2 };
    const updatedCommande: Commande = {
      ...commandeData,
      ...updateData,
      validateQuantity: async function (
        availableQuantity: number,
      ): Promise<boolean> {
        return availableQuantity >= this.quantity;
      },
    };
    jest.spyOn(service, 'update').mockResolvedValueOnce(updatedCommande);
    const result = await controller.update('1', updateData);
    expect(result).toEqual(updatedCommande);
  });

  it('should remove a commande', async () => {
    jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);
    await expect(controller.remove('1')).resolves.not.toThrow();
  });
});
