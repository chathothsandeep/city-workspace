import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateUserDto, UserEntity } from '@city-workspace/shared-models';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../lib/constants/url.constants';

@Injectable({ providedIn: 'root' })
export class SignupService {
  private http = inject(HttpClient);
  signup(dto: CreateUserDto): Observable<UserEntity> | null {
    return this.http.post<UserEntity>(ApiUrl.signUp, dto);
  }
}
