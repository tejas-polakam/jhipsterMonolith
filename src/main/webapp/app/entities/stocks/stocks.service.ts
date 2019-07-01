import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStocks } from 'app/shared/model/stocks.model';

type EntityResponseType = HttpResponse<IStocks>;
type EntityArrayResponseType = HttpResponse<IStocks[]>;

@Injectable({ providedIn: 'root' })
export class StocksService {
  public resourceUrl = SERVER_API_URL + 'api/stocks';

  constructor(protected http: HttpClient) {}

  create(stocks: IStocks): Observable<EntityResponseType> {
    return this.http.post<IStocks>(this.resourceUrl, stocks, { observe: 'response' });
  }

  update(stocks: IStocks): Observable<EntityResponseType> {
    return this.http.put<IStocks>(this.resourceUrl, stocks, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStocks>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStocks[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
