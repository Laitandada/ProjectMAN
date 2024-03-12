import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Avatar, Chip } from '@mui/material';

const AssignedTaskTable = ({ tasks }) => {
    return (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned Users</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    {[...new Set(task.assigned_users.map(user => user.username))].map((username, userIndex) => {
                      const user = task.assigned_users.find(u => u.username === username);
                      return (
                        <Chip
                          key={userIndex}
                          avatar={<Avatar alt={user.username} src={`https://sharechallenge.s3.amazonaws.com/${user.thumbnail}`} />}
                          label={user.username}
                          style={{ marginRight: 5, marginBottom: 5 }}
                        />
                      );
                    })}
                  </TableCell>
                  <TableCell>{task.room.name}</TableCell>
                  <TableCell>{task.due_date}</TableCell>
                  <TableCell>{task.completed ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
};

export default AssignedTaskTable;
