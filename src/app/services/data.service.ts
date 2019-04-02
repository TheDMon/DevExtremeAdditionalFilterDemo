import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private resource: any[] = [
    { 
      ID: 1,
      FirstName: 'Mike',
      LastName: 'Zinda',
      Role: 'Architect',
      Experience: '15 years'
    },
    { 
      ID: 2,
      FirstName: 'Mike',
      LastName: 'Wiz',
      Role: 'DBA',
      Experience: '23 years'
    },
    { 
      ID: 3,
      FirstName: 'Mike',
      LastName: 'Griff',
      Role: 'Developer',
      Experience: '10 years'
    },
    { 
      ID: 4,
      FirstName: 'Stacey',
      LastName: 'Barry',
      Role: 'Business Analist',
      Experience: '25 years'
    },
    { 
      ID: 5,
      FirstName: 'Doug',
      LastName: 'Weigler',
      Role: 'Business Analist',
      Experience: '18 years'
    },
    { 
      ID: 6,
      FirstName: 'Amiri',
      LastName: 'Settles',
      Role: 'Business Analist',
      Experience: '16 years'
    }
  ];

  constructor() { }

  getData(): any[] {
    return this.resource;
  }
}
