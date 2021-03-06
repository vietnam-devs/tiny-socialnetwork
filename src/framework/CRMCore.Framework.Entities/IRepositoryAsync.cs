﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CRMCore.Framework.Entities
{
    public interface IRepositoryAsync<TEntity> where TEntity : EntityBase
    {
        Task<TEntity> GetByIdAsync(Guid id, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<IReadOnlyList<TEntity>> ListAsync(params Expression<Func<TEntity, object>>[] includeProperties);
        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<TEntity> DeleteAsync(TEntity entity);
    }
}
