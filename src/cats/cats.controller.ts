import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/role.enum';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { activeUser } from '../common/decorators/active-user.decorator';

@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(
    @Body() createCatDto: CreateCatDto,
    @activeUser() user: UserActiveInterface,
  ) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(@activeUser() user: UserActiveInterface) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @activeUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCatDto: UpdateCatDto,
    @activeUser() user: UserActiveInterface,
  ) {
    return this.catsService.update(id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @activeUser() user: UserActiveInterface) {
    return this.catsService.remove(id, user);
  }
}
