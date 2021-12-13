import mongoose from 'mongoose'

const { ObjectId } = mongoose
export const eventPipeline = (organizationId) => [
  {
    $match: {
      organization_id: organizationId,
    },
  }, {
    $lookup: {
      from: 'donations',
      localField: '_id',
      foreignField: 'event_id',
      as: 'donations',
    },
  }, {
    $facet: {
      count_old_event: [
        {
          $match: {
            $expr: {
              $lt: [
                {
                  $add: [
                    '$start_date', {
                      $multiply: [
                        '$duration', 24 * 60 * 60000,
                      ],
                    },
                  ],
                }, {
                  $add: [
                    '$$NOW', {
                      $multiply: [
                        1, 31 * 60 * 60000,
                      ],
                    },
                  ],
                },
              ],
            },
          },
        }, {
          $count: 'count_old_event',
        },
      ],
      count_donated_blood: [
        {
          $unwind: '$donations',
        }, {
          $match: {
            'donations.is_done': true,
          },
        }, {
          $group: {
            _id: null,
            count_donated_blood: {
              $sum: '$donations.amount',
            },
          },
        },
      ],
      future_events: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gt: [
                    '$start_date', {
                      $add: [
                        '$$NOW', {
                          $multiply: [
                            1, 7 * 60 * 60000,
                          ],
                        },
                      ],
                    },
                  ],
                }, {
                  $lte: [
                    '$start_date', {
                      $add: [
                        {
                          $add: [
                            '$$NOW', {
                              $multiply: [
                                30, 24 * 60 * 60000,
                              ],
                            },
                          ],
                        }, 7 * 60 * 60000,
                      ],
                    },
                  ],
                },
              ],
            },
          },
        }, {
          $unwind: '$donations',
        }, {
          $group: {
            _id: '$_id',
            name: {
              $first: '$name',
            },
            start_date: {
              $first: '$start_date',
            },
            duration: {
              $first: '$duration',
            },
            count_donation: {
              $sum: 1,
            },
            count_blood: {
              $sum: '$donations.amount',
            },
          },
        },
      ],
      on_going_events: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $lte: [
                    '$start_date', {
                      $add: [
                        '$$NOW', {
                          $multiply: [
                            1, 7 * 60 * 60000,
                          ],
                        },
                      ],
                    },
                  ],
                }, {
                  $gt: [
                    {
                      $add: [
                        '$start_date', {
                          $multiply: [
                            '$duration', 24 * 60 * 60000,
                          ],
                        },
                      ],
                    }, {
                      $add: [
                        '$$NOW', {
                          $multiply: [
                            1, 7 * 60 * 60000,
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        }, {
          $unwind: '$donations',
        }, {
          $group: {
            _id: '$_id',
            not_done_donations_count: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      '$donations.is_done', false,
                    ],
                  }, 1, 0,
                ],
              },
            },
            done_donations_count: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      '$donations.is_done', true,
                    ],
                  }, 1, 0,
                ],
              },
            },
            not_done_amount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      '$donations.is_done', false,
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
            done_amount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      '$donations.is_done', true,
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
          },
        },
      ],
      done_events: [
        {
          $match: {
            $expr: {
              $lt: [
                {
                  $add: [
                    '$start_date', {
                      $multiply: [
                        '$duration', 24 * 60 * 60000,
                      ],
                    },
                  ],
                }, {
                  $add: [
                    '$$NOW', {
                      $multiply: [
                        1, 31 * 60 * 60000,
                      ],
                    },
                  ],
                },
              ],
            },
          },
        }, {
          $unwind: '$donations',
        }, {
          $group: {
            _id: '$_id',
            done_donations_count: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      '$donations.is_done', true,
                    ],
                  }, 1, 0,
                ],
              },
            },
            done_amount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      '$donations.is_done', true,
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
            group_a_amount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          '$donations.is_done', true,
                        ],
                      }, {
                        $eq: [
                          '$donations.blood_type', 'A',
                        ],
                      },
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
            group_b_amount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          '$donations.is_done', true,
                        ],
                      }, {
                        $eq: [
                          '$donations.blood_type', 'B',
                        ],
                      },
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
            group_o_amount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          '$donations.is_done', true,
                        ],
                      }, {
                        $eq: [
                          '$donations.blood_type', 'O',
                        ],
                      },
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
            group_ab_amount: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $eq: [
                          '$donations.is_done', true,
                        ],
                      }, {
                        $eq: [
                          '$donations.blood_type', 'AB',
                        ],
                      },
                    ],
                  }, '$donations.amount', 0,
                ],
              },
            },
          },
        },
      ],
    },
  },
]

export const requestBloodPipeline = (organizationId) => [
  {
    $match: {
      organization_id: organizationId,
      accepted: true,
    },
  }, {
    $facet: {
      count_requests: [
        {
          $count: 'count_requests',
        },
      ],
      count_blood_amount: [
        {
          $match: {
            is_done: true,
          },
        }, {
          $group: {
            _id: null,
            count_blood_amount: {
              $sum: '$amount',
            },
          },
        },
      ],
    },
  },
]
