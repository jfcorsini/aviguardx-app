function getData(data) {
  if (!data || data.errors) return null;
  return data.data;
}

function getErrorMessage(error, data) {
  if (error) return error.message;
  if (data && data.errors) {
    return data.errors[0].message;
  }
  return null;
}

/**
|--------------------------------------------------
| This GraphQL query returns an array of Entries
|
| Learn more about GraphQL: https://graphql.org/learn/
|--------------------------------------------------
*/
export const fetchEntries = async () => {
  const query = `query Entries($size: Int) {
    entries(_size: $size) {
      data {
        _id
        _ts
        name
        map_url
        predicted_url
        simple_tracked_url
        tracked_url
        jsonData
        drone
        recorded_at
      }
      after
    }
  }`;
  const size = 500;
  const res = await fetch(process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { size },
    }),
  });

  const data = await res.json();

  return data;
};

export const fetchStatus = async () => {
  const query = `query Status {
    status {
      status
      _ts
    }
  }`;
  const res = await fetch(process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = await res.json();

  return data;
};

/**
|--------------------------------------------------
| This GraphQL mutation creates a new Entry
|
| Learn more about GraphQL mutations: https://graphql.org/learn/queries/#mutations
|--------------------------------------------------
*/
export const createEntry = async (inputData) => {
  const query = `mutation createEntry($map_url: String!, $tracked_url: String!, $predicted_url: String!, $simple_tracked_url: String!, $name: String!, $recorded_at: Time!, $jsonData: String!, $drone: Boolean) {
    createEntry(data: {
      map_url: $map_url,
      tracked_url: $tracked_url,
      predicted_url: $predicted_url,
      simple_tracked_url: $simple_tracked_url,
      name: $name,
      recorded_at: $recorded_at,
      jsonData: $jsonData,
      drone: $drone
    }) {
      _id
      _ts
      name
      map_url
      tracked_url
      predicted_url
      simple_tracked_url
      name
      recorded_at
      jsonData
      drone
    }
  }`;

  const res = await fetch(process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: inputData,
    }),
  });
  const data = await res.json();

  return data;
};

/**
|--------------------------------------------------
| This GraphQL mutation updates an Entry
|
| Learn more about GraphQL mutations: https://graphql.org/learn/queries/#mutations
|--------------------------------------------------
*/
export const updateEntry = async (currentEntry, newEntryState) => {
  const { _id, _ts, ...entry } = currentEntry;
  const query = `mutation updateEntry($id: ID!, $map_url: String!, $tracked_url: String!, $predicted_url: String!, $simple_tracked_url: String!, $name: String!, $recorded_at: Time!, $jsonData: String!, $drone: Boolean) {
    updateEntry(id: $id, data: {
      map_url: $map_url,
      tracked_url: $tracked_url,
      predicted_url: $predicted_url,
      simple_tracked_url: $simple_tracked_url,
      name: $name,
      recorded_at: $recorded_at,
      jsonData: $jsonData,
      drone: $drone
    }) {
      _id
      _ts
      name
      map_url
      tracked_url
      predicted_url
      simple_tracked_url
      name
      recorded_at
      jsonData
      drone
    }
  }`;

  const res = await fetch(process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        id: _id,
        ...entry,
        ...newEntryState,
      },
    }),
  });
  const data = await res.json();

  return data;
};

/**
 * This method updates the status of the computer. Currently we just
 * have one status so I hardcoded the id to make life easier.
 */
export const updateStatus = async (status) => {
  const query = `mutation updateStatus($id: ID!, $status: ProductStatus!) {
    updateStatus(id: $id, data: {status: $status}) {
      _id
      _ts
      status
    }
  }`;

  const res = await fetch(process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { id: "297491077492900359", status },
    }),
  });
  const data = await res.json();

  return data;
};
