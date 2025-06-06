import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

ApiTags('wallets');
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все кошельки' })
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.walletsService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.walletsService.findByUserId(userId);
  }

  @Get('wallet-type/:walletTypeId')
  findByWalletTypeId(
    @Param('walletTypeId', ParseUUIDPipe) walletTypeId: string
  ) {
    return this.walletsService.findByWalletTypeId(walletTypeId);
  }

  @Get('address/:address')
  findByAddress(@Param('address') address: string) {
    return this.walletsService.findByAddress(address);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateWalletDto: UpdateWalletDto
  ) {
    return this.walletsService.update(id, updateWalletDto);
  }

  @Patch(':id/balance')
  updateBalance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('balance') balance: number
  ) {
    return this.walletsService.updateBalance(id, balance);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.walletsService.remove(id);
  }
}
