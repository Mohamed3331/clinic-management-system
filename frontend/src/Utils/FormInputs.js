export const personalDetails = {
    patientName: {
      key: 'patientName',
      labelName: 'اسم المريض',
      validations: {
        required: true,
      }
    },
    phone: {
      key: 'phoneNumber',
      labelName: 'رقم الهاتف',
      validations: {
        required: true,
      }
    },
    birthdate: {
      key: 'birthDate',
      labelName: 'تاريخ الميلاد',
      type: 'date',
      validations: {
        required: true,
      }
    },
    age: {
      key: 'age',
      labelName: 'السن',
      type: 'number',
      validations: {
        required: true,
        valueAsNumber: true,
      }
    },
    insurance: {
      key: 'insurance',
      labelName: 'التامين',
      type: 'checkbox',
      validations: {
        required: true,
      }
    },
}
  
export const vitalModifiers = {
    bloodpressure: {
      key: 'bloodpressure',
      labelName: 'ضغط الدم',
    },
    breathing: {
      key: 'breathing',
      labelName: 'التنفس',
    },
    heartrate: {
      key: 'heartrate',
      labelName: 'معدل النبض',
    },
    bloodtype: {
      key: 'bloodtype',
      labelName: 'فصيلة الدم',
      select: true,
      myOptions: ['none', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    weight: {
      key: 'weight',
      labelName: 'الوزن',
    },
}
  
export const usualHabits = {
    eatfruits: {
      key: 'eatfruits',
      labelName: 'اكل الفواكهة',
      type: 'checkbox'
    },
    eatvegetables: {
      key: 'eatvegetables',
      labelName: 'اكل الخضراوات',
      type: 'checkbox'
    },
    eatmeat: {
      key: 'eatmeat',
      labelName: 'اكل الحوم',
      type: 'checkbox'
    },
    smoke: {
      key: 'smoke',
      labelName: 'التدخين',
      select: true,
      myOptions: ['none', 'Never', 'Seldom', 'Regularly', 'Intensive']
      
    },
    alcohol: {
      key: 'alcohol',
      labelName: 'الكحول',
      select: true,
      myOptions: ['none', 'Never', 'Seldom', 'Regularly', 'Intensive']
    },
    workout: {
      key: 'workout',
      labelName: 'ممارسة الرياضة',
      select: true,
      myOptions: ['none', 'Never', 'Seldom', 'Regularly', 'Intensive']
    },
}