import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';

import { UserModel } from './../../models/user.model';
import { UserArrayService } from './../../services/user-array.service';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  private editedUser: UserModel;

  constructor(
    private userArrayService: UserArrayService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.users$ = this.userArrayService.getUsers();
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userArrayService.getUser(+params.get('editUserId'))
      )
    ).subscribe((user: UserModel) => {
      this.editedUser = { ...user };
      console.log(
        `Last time you edited user ${JSON.stringify(this.editedUser)}`
      );
    });
  }

  onEditUser(user: UserModel) {
    const link = ['edit', user.id];
    this.router.navigate(link, { relativeTo: this.route });
  }

  isEdited(user: UserModel) {
    if (user.id === this.editedUser.id) {
      return true;
    }
    return false;
  }
}

