import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

const TaskTable = ({ tasks }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task.task.title}</TableCell>
              <TableCell>{task.task.description}</TableCell>
              <TableCell>{task.assigned_to.username}</TableCell>
              <TableCell>{task.task.due_date}</TableCell>
              <TableCell>{task.task.completed ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TaskTable;
