import React, { useState, useCallback } from 'react';
import { Form, FormLayout, TextField, DatePicker, Select, Button, ButtonGroup, Card, Label, Popover, Icon, Box } from '@shopify/polaris';
import {
  CalendarMinor
} from '@shopify/polaris-icons';
import { format } from 'date-fns';
import DatePickerField from './DatePickerField';

const UpdateUserForm = ({ userData }) => {
  const [formData, setFormData] = useState(userData);

  // Date props for birthday
  // default to today if userData doesn't have birthday and DatePicker doesn't break
  const initialBirthdayDate = userData?.birthday ? new Date(userData?.birthday) : new Date();
  let initialBirthdayMonth = initialBirthdayDate.getMonth(),
      initialBirthdayYear = initialBirthdayDate.getFullYear();

  // DatePicker component props
  const [selectedDate, setSelectedDate] = useState(initialBirthdayDate);
  const [{ month, year }, setDatePickerMonthYear] = useState({ month: initialBirthdayMonth, year: initialBirthdayYear });

  // Popover props
  const [visible, setVisible] = useState(false);
  function handleOnClose() {
    setVisible(false);
  }

  const handleFieldChange = (field, value) => {
    setFormData(prevFormData => ({ ...prevFormData, [field]: value }));
  };

  const handleSave = () => {
    // Log the updated user data to the console, though I assume we would send this in a POST request back normally
    console.log('Updated User Data:', formData);
  };

  const handleCancel = () => {
    // Revert form field values back to initial data
    setFormData(userData);
    setDatePickerMonthYear({ month: initialBirthdayMonth, year: initialBirthdayYear });
    setSelectedDate(initialBirthdayDate)
  };

  const handleMonthChange = useCallback(
    (month, year) => setDatePickerMonthYear(prevState => ({ ...prevState, month, year })),
    []
  );

  const handleDateChange = useCallback(
    (selectedDate) => setSelectedDate(selectedDate),
    [],
  );

  return (
    <Card title="Edit User Details" sectioned>
      <Form>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              label="First Name"
              value={formData?.first_name}
              onChange={(value) => handleFieldChange('first_name', value)}
            />
            <TextField
              label="Last Name"
              value={formData?.last_name}
              onChange={(value) => handleFieldChange('last_name', value)}
            />
          </FormLayout.Group>
          <TextField
            label="Address"
            value={formData?.address}
            onChange={(value) => handleFieldChange('address', value)}
            multiline={4}
          />
          <FormLayout.Group>
            <Popover
              active={visible}
              fullWidth
              autofocusTarget="none"
              preferredAlignment="left"
              preferInputActivator={false}
              preferredPosition="below"
              preventCloseOnChildOverlayClick
              onClose={handleOnClose}
              activator={
                <TextField
                  role="combobox"
                  label={"Birthday"}
                  prefix={<Icon source={CalendarMinor} />}
                  value={formData.birthday}
                  onFocus={() => setVisible(true)}
                  autoComplete="off"
                />
              }
            >
              <Card>
                <DatePicker
                  month={month}
                  year={year}
                  selected={selectedDate}
                  onChange={(value) => {
                    handleFieldChange('birthday', format(value?.start, 'yyyy-MM-dd'));
                    handleDateChange(value);
                    setVisible(false);
                  }}
                  onMonthChange={handleMonthChange}
                />
              </Card>
            </Popover>
            <Select
              label="Gender"
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
                { label: 'Unknown', value: 'unknown' }
              ]}
              value={formData?.gender}
              onChange={(value) => handleFieldChange('gender', value)}
            />
          </FormLayout.Group>
          <ButtonGroup spacing='tight'>
            <Button primary onClick={handleSave}>Save</Button>
            <Button destructive onClick={handleCancel}>Cancel</Button>
          </ButtonGroup>
        </FormLayout>
      </Form>
    </Card>
  );
};

export default UpdateUserForm;