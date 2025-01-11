import React from 'react';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

export function CustomToolbar({}) {
  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}
