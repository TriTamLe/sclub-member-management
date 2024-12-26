# Form example requirement

> This document is a example requirement for making a forms. It will be used to enjoy new front end technology

# Overview requirement

Danang Soft Skills Club (SClub) are making a member management system. They need a form to create new member. An member
includes these information

| Field Name       | Type              | Is required or not | Unique | Special requirement                                                                                                                                          |
|------------------|-------------------|--------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fullname         | Text              | YES                | NO     |                                                                                                                                                              |
| Email            | Text              | YES                | YES    |                                                                                                                                                              |
| University       | Text              | NO                 | NO     |                                                                                                                                                              |
| University Grade | Number            | NO                 | NO     | This number should be between 1 and 8                                                                                                                        |
| Gender           | Boolean           | YES                | NO     |                                                                                                                                                              |
| Birthday         | Date              | YES                | NO     |                                                                                                                                                              |
| Avatar           | Text              | NO                 | NO     |                                                                                                                                                              |
| Phone number     | Text              | NO                 | YES    |                                                                                                                                                              |
| Address          | Text              | YES                | NO     |                                                                                                                                                              |
| House            | Select            | YES                | NO     | View the next part to view the house list                                                                                                                    |
| Joining year     | Text              | YES                | NO     | This is the year that the member has join. From the time the club is established to now                                                                      |
| Member type      | Select            | YES                | NO     | This tell if the member is still regularly participate in the club or being an elder or no more joining                                                      |
| Positions        | Array of Position | YES                | NO     | This is the list of all position and the in-charged period that the member has taken over during the joining time. View the next part to view the title list |

# Special fields requirements

## House:

Member of SClub are sorted into houses. There are four houses. Check the appendix to get the list of house logo

| Name of the house | Informal Name |
|-------------------|---------------|
| Ant House         | Nhà 1         |
| Smile House       | Nhà 2         |
| Storm House       | Nhà 3         |
| Shark House       | Nhà 4         |

## Position

| English           | Vietnamese                    |
|-------------------|-------------------------------|
| House staff       | Staff Nhà                     |
| House head        | Nhà trưởng                    |
| Head of Media     | Trưởng Ban Truyền thông       |
| Media Staff       | Staff Truyền thông            |
| Head of HR        | Trưởng Ban Quản lý Thành viên |
| HR Staff          | Staff Quản lý Thành viên      |
| Head of Event     | Trưởng Ban Đối nội            |
| Event Staff       | Staff Đối nội                 |
| Head of Relations | Trưởng Ban Đối ngoại          |
| Relations Staff   | Staff Đối ngoại               |
| Vice President    | Phó Chủ nhiệm                 |
| President         | Chủ nhiệm                     |

## Member type

| Member type    | Description                                                                                                                   | Vietnamese title       |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|------------------------|
| Regular member | The member that will actively join any events from the club                                                                   | Thành viên thường trực |
| Elder          | The member who has been involved in the club for years, taken at least one position and currenly has not in the club any more | Cựu thành viên         |
| Former member  | The member that will no longer been involved in any club events and had not taken any position in the club                    | Cựu thành viên         |

## Period

SClub is established in 2009 so the first period is 2009-2010. We will counting it from that
