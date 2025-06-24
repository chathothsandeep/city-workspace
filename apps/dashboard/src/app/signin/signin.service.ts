import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignInDto, UserEntity } from '@city-workspace/shared-models';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../lib/constants/url.constants';

@Injectable({ providedIn: 'root' })
export class SigninService {
  private http = inject(HttpClient);

  signin(dto: SignInDto): Observable<UserEntity> | null {
    return this.http.post<UserEntity>(ApiUrl.signIn, dto);
  }
}
