import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../../shared/entites/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = this.walletsRepository.create(createWalletDto);
    return await this.walletsRepository.save(wallet);
  }

  async findAll(): Promise<Wallet[]> {
    return await this.walletsRepository.find({
      relations: ['user', 'walletType'],
    });
  }

  async findOne(id: string): Promise<Wallet> {
    return await this.walletsRepository.findOne({
      where: { id },
      relations: ['user', 'walletType'],
    });
  }

  async findByUserId(userId: string): Promise<Wallet[]> {
    return await this.walletsRepository.find({
      where: { user_id: userId },
      relations: ['user', 'walletType'],
    });
  }

  async findByWalletTypeId(walletTypeId: string): Promise<Wallet[]> {
    return await this.walletsRepository.find({
      where: { wallet_type_id: walletTypeId },
      relations: ['user', 'walletType'],
    });
  }

  async findByAddress(address: string): Promise<Wallet> {
    return await this.walletsRepository.findOne({
      where: { address },
      relations: ['user', 'walletType'],
    });
  }

  async update(id: string, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    await this.walletsRepository.update(id, updateWalletDto);
    return await this.findOne(id);
  }

  async updateBalance(id: string, balance: number): Promise<Wallet> {
    await this.walletsRepository.update(id, { balance });
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.walletsRepository.delete(id);
  }
}
