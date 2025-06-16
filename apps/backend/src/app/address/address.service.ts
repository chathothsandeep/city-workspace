import {
  CreateAddressDto,
  UpdateAddressDto,
} from '@city-workspace/shared-models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddressRepo } from './address.repo';
import { HttpErrorHelper } from '../../lib/helpers/httpError.helper';

@Injectable()
export class AddressService {
  constructor(private readonly repo: AddressRepo) {}

  async create(createAddressDto: CreateAddressDto) {
    try {
      const address = await this.repo.create(createAddressDto);
      if (!address)
        throw new HttpException(
          'Address cannot be created',
          HttpStatus.BAD_REQUEST,
        );
      return address;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async findAll(params: any) {
    let addresses;
    try {
      addresses = await this.repo.findAll({});
      if (!addresses || addresses.length === 0) {
        throw new HttpException('No addresses Found', HttpStatus.NOT_FOUND);
      }
      return addresses;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async findOne(id: number) {
    try {
      const address = await this.repo.find(id);
      if (!address) {
        throw new HttpException('Address Not Found', HttpStatus.NOT_FOUND);
      }
      return address;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    try {
      const updatedAddress = await this.repo.update(id, updateAddressDto);
      if (!updatedAddress) {
        throw new HttpException('Address Not Found', HttpStatus.NOT_FOUND);
      }
      return updatedAddress;
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }

  async remove(id: number) {
    try {
      const deletedAddress = await this.repo.delete(id);
      if (!deletedAddress) {
        throw new HttpException('Address Not Found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Address deleted successfully' };
    } catch (error) {
      HttpErrorHelper.handleError(error);
    }
  }
}
