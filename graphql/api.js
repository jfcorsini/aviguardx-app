import useFetch from "../lib/useFetch";

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
export const useEntries = () => {
  const query = `query Entries($size: Int) {
    entries(_size: $size) {
      data {
        _id
        _ts
        name
        map_url
        predicted_url
        tracked_url
        jsonData
        recorded_at
      }
      after
    }
  }`;
  const size = 100;
  const { data, error } = useFetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
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
    }
  );

  return {
    data: getData(data),
    errorMessage: getErrorMessage(error, data),
    error,
  };
};

export const useStatus = () => {
  const query = `query Status {
    status {
      status
      _ts
    }
  }`;
  const { data, error } = useFetch(
    process.env.NEXT_PUBLIC_FAUNADB_GRAPHQL_ENDPOINT,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }
  );
  if (!data) {
    return {
      loading: true,
    };
  }

  if (error) {
    return {
      error,
    };
  }

  const result = data.data.status;

  return {
    loading: false,
    data: {
      status: result.status,
      ts: new Date(result._ts),
    },
  };
};

/**
|--------------------------------------------------
| This GraphQL mutation creates a new Entry
|
| Learn more about GraphQL mutations: https://graphql.org/learn/queries/#mutations
|--------------------------------------------------
*/
export const createEntry = async (inputData) => {
  const query = `mutation createEntry($map_url: String!, $tracked_url: String!, $predicted_url: String!, $name: String!, $recorded_at: Time!, $jsonData: String!) {
    createEntry(data: {
      map_url: $map_url,
      tracked_url: $tracked_url,
      predicted_url: $predicted_url,
      name: $name,
      recorded_at: $recorded_at,
      jsonData: $jsonData
    }) {
      _id
      _ts
      name
      map_url
      tracked_url
      predicted_url
      name
      recorded_at
      jsonData
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
  const query = `mutation updateEntry($id: ID!, $map_url: String!, $tracked_url: String!, $predicted_url: String!, $name: String!, $recorded_at: Time!, $jsonData: String!) {
    updateEntry(id: $id, data: {
      map_url: $map_url,
      tracked_url: $tracked_url,
      predicted_url: $predicted_url,
      name: $name,
      recorded_at: $recorded_at,
      jsonData: $jsonData
    }) {
      _id
      _ts
      name
      map_url
      tracked_url
      predicted_url
      name
      recorded_at
      jsonData
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
