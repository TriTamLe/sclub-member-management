# View the list of SClub member

> This document is an example requirement for viewing the list of SClub member

## Acceptance Criteria

- [ ] Admin can view a list of member include these information:
    - Profile picture
    - Full name
    - Gender
    - House
    - Gender
    - Member type
    - University
    - Position if they are regular member
- [ ] The list is paginated into 10, 20, 50 items in a page
- [ ] Admin can sort the list full name and by house
- [ ] Admin can select a member to view his/her detail
- [ ] There will be a button to create new member
- Admin can filter the list by:
    - [ ] House,
    - [ ] Gender,
    - [ ] Member type,
    - [ ] Position,
    - [ ] Joining year
- [ ] As default, the list is sorted by created time

## User flow

- Admin access the member list screen
- Admin view a table of member
- Admin click on the column of full name and house to sort the list ascending/descending
- Admin select the number of members in a page on a dropdown in the top right corner of the list
- Admin select the year to filter member for that year
- Admin can select the house, position, member type to filter the member
- Admin click on "More" button on one row and navigate toward the viewing detail page
- Admin click on "Create new member" button to create new member

## Specification

### Backend

Write a function to fetch the data, the arguments:

```typescript
{
    pageIndex: number;
    pageSize: number;
    orderBy: ["name", "house", "created_at"];
    filterBy: ["gender", "house", "member_type", "position", "joining_year"];
    filterValue: string;
}
```

The function fetching the data based on the arguments and return a list of data,

```typescript
{
    id: string;
    avatar: string;
    fullName: string;
    gender: {
        value: int;
        name: string;
    }
    ;
    house: {
        value: int;
        name: string;
    }
    memberType: {
        value: int;
        name: string;
    }
    university: string;
    joiningYear: int;
    positions: {
        value: int;
        name: string;
        term: int;
    }
    [];
}
```

### Frontend

- Use Tanstack React Table + Shadcn to make the table

## References

- [Detail of member](detail-of-member.md)
- [Create new member](create-new-member.md)
